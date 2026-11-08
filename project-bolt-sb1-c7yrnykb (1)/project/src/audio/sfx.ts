export type SfxName =
  | 'tap'
  | 'pop'
  | 'correct'
  | 'wrong'
  | 'celebrate'
  | 'flip'
  | 'whoosh'
  | 'click'
  | 'star'
  | 'reward'
  | 'complete';

let context: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!context) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
  }
  if (context.state === 'suspended') void context.resume();
  return context;
}

export interface ToneOptions {
  freq: number;
  start?: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  endFreq?: number;
}

export function scheduleTone(ctx: AudioContext, destination: AudioNode, options: ToneOptions): OscillatorNode {
  const t0 = ctx.currentTime + (options.start ?? 0);
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = options.type ?? 'sine';
  osc.frequency.setValueAtTime(options.freq, t0);
  if (options.endFreq) osc.frequency.exponentialRampToValueAtTime(options.endFreq, t0 + options.duration);
  const peak = options.gain ?? 0.3;
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(peak, t0 + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + options.duration);
  osc.connect(env).connect(destination);
  osc.start(t0);
  osc.stop(t0 + options.duration + 0.05);
  return osc;
}

const SFX_TONES: Record<SfxName, ToneOptions[]> = {
  tap: [{ freq: 660, duration: 0.12, gain: 0.25 }],
  click: [{ freq: 880, duration: 0.06, type: 'triangle', gain: 0.2 }],
  pop: [{ freq: 520, endFreq: 980, duration: 0.15, gain: 0.3 }],
  correct: [
    { freq: 523, duration: 0.25, gain: 0.3 },
    { freq: 659, start: 0.12, duration: 0.25, gain: 0.3 },
    { freq: 784, start: 0.24, duration: 0.35, gain: 0.3 },
  ],
  wrong: [{ freq: 330, endFreq: 262, duration: 0.3, type: 'triangle', gain: 0.2 }],
  celebrate: [
    { freq: 523, duration: 0.2, gain: 0.3 },
    { freq: 659, start: 0.1, duration: 0.2, gain: 0.3 },
    { freq: 784, start: 0.2, duration: 0.2, gain: 0.3 },
    { freq: 1047, start: 0.3, duration: 0.45, gain: 0.3 },
    { freq: 784, start: 0.5, duration: 0.2, gain: 0.2 },
    { freq: 1047, start: 0.65, duration: 0.6, gain: 0.3 },
  ],
  flip: [{ freq: 300, endFreq: 900, duration: 0.15, type: 'triangle', gain: 0.15 }],
  whoosh: [{ freq: 200, endFreq: 800, duration: 0.3, gain: 0.12 }],
  star: [
    { freq: 1319, duration: 0.14, type: 'triangle', gain: 0.2 },
    { freq: 1760, start: 0.08, duration: 0.22, type: 'triangle', gain: 0.18 },
  ],
  reward: [
    { freq: 659, duration: 0.18, type: 'triangle', gain: 0.22 },
    { freq: 784, start: 0.14, duration: 0.18, type: 'triangle', gain: 0.22 },
    { freq: 988, start: 0.28, duration: 0.18, type: 'triangle', gain: 0.22 },
    { freq: 1319, start: 0.42, duration: 0.45, type: 'triangle', gain: 0.22 },
  ],
  complete: [
    { freq: 784, duration: 0.16, gain: 0.22 },
    { freq: 988, start: 0.12, duration: 0.16, gain: 0.22 },
    { freq: 1175, start: 0.24, duration: 0.3, gain: 0.22 },
  ],
};

export function playSfx(name: SfxName, volume: number): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);
  for (const tone of SFX_TONES[name]) {
    scheduleTone(ctx, master, tone);
  }
}
