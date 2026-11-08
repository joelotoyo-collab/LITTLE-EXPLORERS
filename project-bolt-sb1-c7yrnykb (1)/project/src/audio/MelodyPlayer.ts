import { getAudioContext, scheduleTone } from '@/audio/sfx';

export type MelodyNote = readonly [pitch: string | null, beats: number];

export interface Melody {
  bpm: number;
  notes: readonly MelodyNote[];
}

interface ScheduledNote {
  frequency: number | null;
  start: number;
  duration: number;
}

const SEMITONES: Record<string, number> = {
  C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11,
};

export function pitchToFrequency(pitch: string): number {
  const match = /^([A-G]#?)(\d)$/.exec(pitch);
  if (!match) return 440;
  const midi = (Number(match[2]) + 1) * 12 + SEMITONES[match[1]];
  return 440 * 2 ** ((midi - 69) / 12);
}

export class MelodyPlayer {
  readonly totalSeconds: number;
  private readonly notes: ScheduledNote[];
  private nodes: OscillatorNode[] = [];
  private master: GainNode | null = null;
  private startedAt = 0;
  private pausedAt = 0;
  private playing = false;
  private endTimer: number | undefined;
  onEnd: (() => void) | null = null;

  constructor(melody: Melody) {
    const beat = 60 / melody.bpm;
    let cursor = 0;
    this.notes = melody.notes.map(([pitch, beats]) => {
      const duration = beats * beat;
      const note = { frequency: pitch ? pitchToFrequency(pitch) : null, start: cursor, duration };
      cursor += duration;
      return note;
    });
    this.totalSeconds = cursor;
  }

  get isPlaying(): boolean {
    return this.playing;
  }

  position(): number {
    const ctx = getAudioContext();
    if (!this.playing || !ctx) return this.pausedAt;
    return Math.min(this.totalSeconds, ctx.currentTime - this.startedAt);
  }

  play(from: number, volume: number): void {
    const ctx = getAudioContext();
    if (!ctx) return;
    this.stopNodes();
    const start = Math.max(0, Math.min(from, this.totalSeconds));
    this.master = ctx.createGain();
    this.master.gain.value = volume;
    this.master.connect(ctx.destination);
    this.startedAt = ctx.currentTime - start;

    for (const note of this.notes) {
      if (note.frequency === null) continue;
      const remaining = note.start + note.duration - start;
      if (remaining <= 0) continue;
      const delay = Math.max(0, note.start - start);
      const length = Math.min(note.duration, remaining) * 0.9;
      this.nodes.push(
        scheduleTone(ctx, this.master, {
          freq: note.frequency,
          start: delay,
          duration: Math.max(0.08, length),
          type: 'triangle',
          gain: 0.22,
        }),
      );
    }

    this.playing = true;
    this.pausedAt = start;
    window.clearTimeout(this.endTimer);
    this.endTimer = window.setTimeout(() => {
      this.playing = false;
      this.pausedAt = 0;
      this.stopNodes();
      this.onEnd?.();
    }, (this.totalSeconds - start) * 1000);
  }

  pause(): void {
    if (!this.playing) return;
    this.pausedAt = this.position();
    this.playing = false;
    window.clearTimeout(this.endTimer);
    this.stopNodes();
  }

  stop(): void {
    window.clearTimeout(this.endTimer);
    this.playing = false;
    this.pausedAt = 0;
    this.stopNodes();
  }

  setVolume(volume: number): void {
    if (this.master) this.master.gain.value = volume;
  }

  private stopNodes(): void {
    for (const node of this.nodes) {
      try {
        node.stop();
      } catch {
        // Node already stopped.
      }
    }
    this.nodes = [];
    this.master?.disconnect();
    this.master = null;
  }
}
