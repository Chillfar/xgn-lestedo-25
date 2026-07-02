import { useRef, useCallback, useEffect } from 'react';

// ── Global Singleton AudioContext ──────────────────────────────────────
let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

// Unlock audio context on first interaction so we can play async sounds later
function unlockAudioContext() {
  const ctx = getCtx();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  document.removeEventListener('click', unlockAudioContext);
  document.removeEventListener('touchstart', unlockAudioContext);
}

if (typeof document !== 'undefined') {
  document.addEventListener('click', unlockAudioContext);
  document.addEventListener('touchstart', unlockAudioContext);
}

type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';

function playNote(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  volume = 0.28,
  wave: WaveType = 'sine'
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = wave;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

// ── Sound definitions ────────────────────────────────────────────────

function soundPointAssigned() {
  const ctx = getCtx();
  if (!ctx) return;
  // Ensure it's running before playing
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  
  const t = ctx.currentTime;
  playNote(ctx, 523.25, t,        0.12, 0.22, 'sine'); // C5
  playNote(ctx, 659.25, t + 0.10, 0.12, 0.22, 'sine'); // E5
  playNote(ctx, 783.99, t + 0.20, 0.18, 0.28, 'sine'); // G5
}

function soundRoundWon() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  const t = ctx.currentTime;
  playNote(ctx, 523.25, t,        0.14, 0.26, 'triangle');
  playNote(ctx, 659.25, t + 0.12, 0.14, 0.26, 'triangle');
  playNote(ctx, 783.99, t + 0.24, 0.14, 0.26, 'triangle');
  playNote(ctx, 1046.5, t + 0.38, 0.30, 0.30, 'triangle');
  playNote(ctx, 261.63, t + 0.38, 0.40, 0.12, 'sine');
  playNote(ctx, 392.00, t + 0.38, 0.40, 0.12, 'sine');
}

function soundPredictionHit() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  const t = ctx.currentTime;
  playNote(ctx, 880,    t,        0.1,  0.20, 'sine');
  playNote(ctx, 1108.7, t + 0.08, 0.15, 0.20, 'sine');
}

function soundPodiumReveal() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  const t = ctx.currentTime;
  const vol = 0.15;
  const wave = 'square';
  
  // "Ta - da - da"
  playNote(ctx, 392.00, t, 0.1, vol, wave);
  playNote(ctx, 392.00, t + 0.15, 0.1, vol, wave);
  playNote(ctx, 392.00, t + 0.30, 0.1, vol, wave);
  
  // "DAAA" (C major chord)
  playNote(ctx, 523.25, t + 0.45, 0.6, vol, wave); // C5
  playNote(ctx, 659.25, t + 0.45, 0.6, vol, wave); // E5
  playNote(ctx, 783.99, t + 0.45, 0.6, vol, wave); // G5
}

// ── Hook ────────────────────────────────────────────────────────────

export default function useSoundEffects(isMuted: boolean) {
  const mutedRef = useRef(isMuted);
  
  useEffect(() => {
    mutedRef.current = isMuted;
  }, [isMuted]);

  const guard = useCallback((fn: () => void) => {
    if (!mutedRef.current) {
      try { fn(); } catch { /* ignore */ }
    }
  }, []);

  return {
    playPointAssigned: useCallback(() => guard(soundPointAssigned), [guard]),
    playRoundWon:      useCallback(() => guard(soundRoundWon),      [guard]),
    playPredictionHit: useCallback(() => guard(soundPredictionHit), [guard]),
    playPodiumReveal:  useCallback(() => guard(soundPodiumReveal),  [guard]),
  };
}
