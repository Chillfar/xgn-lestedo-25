import { useEffect, useRef, useCallback } from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const BUZZER_DOC = "signals/buzzer";

/**
 * Singleton AudioContext that gets created and unlocked on the first
 * user gesture (click/keydown anywhere on the page).
 *
 * Browsers require a user interaction before allowing audio playback.
 * Creating the AudioContext here (and calling resume() inside a gesture)
 * ensures it is in "running" state when a remote buzzer signal arrives.
 */
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    try {
      sharedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return sharedAudioCtx;
}

/**
 * Call this inside a user gesture (click) to unlock the AudioContext.
 * Must be called before any non-gesture-triggered playback will work.
 */
function unlockAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
}

/**
 * Plays an attention-grabbing synth buzzer using the Web Audio API.
 * Uses the shared (pre-unlocked) AudioContext so it works both from
 * user gestures AND from Firestore onSnapshot callbacks.
 */
export function playBuzzerSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // If still suspended (user hasn't interacted yet), try to resume
  const play = () => {
    try {
      const playTone = (freq: number, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      playTone(880, now,        0.15);
      playTone(660, now + 0.15, 0.15);
      playTone(880, now + 0.30, 0.15);
      playTone(660, now + 0.45, 0.15);
      playTone(880, now + 0.60, 0.20);
    } catch {
      // Silently fail
    }
  };

  if (ctx.state === "suspended") {
    ctx.resume().then(play).catch(() => {});
  } else {
    play();
  }
}

/**
 * Hook that:
 * 1. Registers a document-level listener to unlock the AudioContext on
 *    the very first user interaction (so remote sounds work later).
 * 2. Listens for buzzer signals in Firestore and plays a sound
 *    when a new signal is detected.
 *
 * Returns a `triggerBuzzer` function that writes a new timestamp to
 * Firestore, causing all connected clients to play the sound.
 */
export default function useBuzzer() {
  const lastSeenRef = useRef<number | null>(null);
  const isFirstLoadRef = useRef(true);
  // Flag to skip double-play on the triggering client
  const localTriggerRef = useRef(false);

  // Unlock AudioContext on first user interaction anywhere on the page
  useEffect(() => {
    const handler = () => {
      unlockAudio();
      // Only need to do this once
      document.removeEventListener("click", handler, true);
      document.removeEventListener("keydown", handler, true);
    };
    document.addEventListener("click", handler, true);
    document.addEventListener("keydown", handler, true);
    return () => {
      document.removeEventListener("click", handler, true);
      document.removeEventListener("keydown", handler, true);
    };
  }, []);

  // Listen for Firestore buzzer signals
  useEffect(() => {
    const docRef = doc(db, BUZZER_DOC);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      if (!data?.triggeredAt) return;

      // Convert Firestore Timestamp to millis
      const triggeredAtMs =
        typeof data.triggeredAt.toMillis === "function"
          ? data.triggeredAt.toMillis()
          : data.triggeredAt;

      if (isFirstLoadRef.current) {
        // On first load, record current value — don't play
        lastSeenRef.current = triggeredAtMs;
        isFirstLoadRef.current = false;
        return;
      }

      if (lastSeenRef.current !== triggeredAtMs) {
        lastSeenRef.current = triggeredAtMs;
        // Skip for the local user — they already heard it via the click
        if (localTriggerRef.current) {
          localTriggerRef.current = false;
        } else {
          playBuzzerSound();
        }
      }
    });

    return unsubscribe;
  }, []);

  const triggerBuzzer = useCallback(async () => {
    // Mark as local trigger so onSnapshot won't double-play
    localTriggerRef.current = true;
    const docRef = doc(db, BUZZER_DOC);
    await setDoc(docRef, { triggeredAt: serverTimestamp() }, { merge: true });
  }, []);

  return { triggerBuzzer };
}
