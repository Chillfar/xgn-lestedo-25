import { useEffect, useRef, useCallback } from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const BUZZER_DOC = "signals/buzzer";

/**
 * Plays an attention-grabbing synth buzzer using the Web Audio API.
 * Two-tone descending beep — no audio files needed.
 */
export function playBuzzerSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

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
    // Three rapid descending tones for an alarm feel
    playTone(880, now, 0.15);
    playTone(660, now + 0.15, 0.15);
    playTone(880, now + 0.30, 0.15);
    playTone(660, now + 0.45, 0.15);
    playTone(880, now + 0.60, 0.20);

    // Close the context after sound finishes
    setTimeout(() => ctx.close(), 1200);
  } catch {
    // Silently fail if AudioContext is not available
  }
}

/**
 * Hook that listens for buzzer signals in Firestore and plays a sound
 * when a new signal is detected.
 *
 * Returns a `triggerBuzzer` function that writes a new timestamp to Firestore,
 * causing all connected clients to play the sound.
 */
export default function useBuzzer() {
  // Track the last seen timestamp to detect new signals vs. initial load
  const lastSeenRef = useRef<number | null>(null);
  const isFirstLoadRef = useRef(true);
  // Flag to skip sound on the triggering client (they already played it locally)
  const localTriggerRef = useRef(false);

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
        // On first load, just record the current value — don't play the sound
        lastSeenRef.current = triggeredAtMs;
        isFirstLoadRef.current = false;
        return;
      }

      // Only play if this is a genuinely new trigger
      if (lastSeenRef.current !== triggeredAtMs) {
        lastSeenRef.current = triggeredAtMs;
        // Skip sound for the user who triggered it — they already heard it locally
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
