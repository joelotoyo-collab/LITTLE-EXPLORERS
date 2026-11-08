import { pitchToFrequency } from '@/audio/MelodyPlayer';
import { MUSIC_THEMES, type MusicTheme, type NoteEvent } from '@/audio/musicThemes';
import { getAudioContext, scheduleTone, type ToneOptions } from '@/audio/sfx';

const LOOKAHEAD_SECONDS = 0.15;
const TICK_MS = 50;
const FADE_TIME_CONSTANT = 0.6;
const VOICE_DUCK_CONSTANT = 0.15;
const VOICE_LEVEL = 0.12;

type Tone = Omit<ToneOptions, 'start'>;

interface MusicEvent {
  time: number;
  tone: Tone;
}

interface MusicRun {
  ctx: AudioContext;
  master: GainNode;
  events: MusicEvent[];
  loopLength: number;
  loopStart: number;
  cursor: number;
}

function buildLoop(theme: MusicTheme): { events: MusicEvent[]; loopLength: number } {
  const def = MUSIC_THEMES[theme];
  const beat = 60 / def.bpm;
  const events: MusicEvent[] = [];

  const addTrack = (notes: readonly NoteEvent[], tone: { type: OscillatorType; gain: number }) => {
    let time = 0;
    for (const [pitch, beats] of notes) {
      if (pitch) events.push({ time, tone: { ...tone, freq: pitchToFrequency(pitch), duration: beats * beat * 0.9 } });
      time += beats * beat;
    }
  };

  addTrack(def.melody, { type: 'triangle', gain: 0.1 });
  addTrack(def.bass, { type: 'sine', gain: 0.14 });

  const totalBeats = def.melody.reduce((sum, [, beats]) => sum + beats, 0);
  if (def.beat) {
    for (let index = 0; index < Math.round(totalBeats); index += 1) {
      events.push({ time: index * beat, tone: { freq: 150, endFreq: 45, duration: 0.14, type: 'sine', gain: 0.22 } });
    }
  }

  events.sort((a, b) => a.time - b.time);
  return { events, loopLength: totalBeats * beat };
}

class BackgroundMusic {
  private unlocked = false;
  private enabled = false;
  private volume = 0.35;
  private theme: MusicTheme = 'home';
  private voices = 0;
  private run: MusicRun | null = null;
  private timer: number | undefined;

  unlock(): void {
    if (!getAudioContext()) return;
    this.unlocked = true;
    if (this.enabled && !this.run) this.startRun();
  }

  setEnabled(on: boolean): void {
    this.enabled = on;
    if (!this.unlocked) return;
    if (on) {
      if (!this.run) this.startRun();
      else this.applyLevel(FADE_TIME_CONSTANT);
    } else {
      this.retire();
    }
  }

  setVolume(volume: number): void {
    this.volume = volume;
    this.applyLevel(0.2);
  }

  setTheme(theme: MusicTheme): void {
    if (theme === this.theme) return;
    this.theme = theme;
    if (this.unlocked && this.enabled) this.startRun();
  }

  beginVoice(): void {
    this.voices += 1;
    this.applyLevel(VOICE_DUCK_CONSTANT);
  }

  endVoice(): void {
    this.voices = Math.max(0, this.voices - 1);
    this.applyLevel(VOICE_DUCK_CONSTANT * 3);
  }

  private startRun(): void {
    const ctx = getAudioContext();
    if (!ctx) return;
    this.retire();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    const { events, loopLength } = buildLoop(this.theme);
    this.run = { ctx, master, events, loopLength, loopStart: ctx.currentTime + 0.1, cursor: 0 };
    this.applyLevel(FADE_TIME_CONSTANT);
    this.timer = window.setInterval(() => this.schedule(), TICK_MS);
    this.schedule();
  }

  private retire(): void {
    const run = this.run;
    if (!run) return;
    this.run = null;
    window.clearInterval(this.timer);
    this.timer = undefined;
    run.master.gain.setTargetAtTime(0, run.ctx.currentTime, FADE_TIME_CONSTANT);
    window.setTimeout(() => run.master.disconnect(), 3000);
  }

  private applyLevel(timeConstant: number): void {
    const run = this.run;
    if (!run) return;
    const level = this.volume * (this.voices > 0 ? VOICE_LEVEL : 1);
    run.master.gain.setTargetAtTime(level, run.ctx.currentTime, timeConstant);
  }

  private schedule(): void {
    const run = this.run;
    if (!run) return;
    const now = run.ctx.currentTime;
    if (run.loopStart + run.loopLength < now) {
      run.loopStart = now + 0.05;
      run.cursor = 0;
    }
    const horizon = now + LOOKAHEAD_SECONDS;
    for (;;) {
      const event = run.events[run.cursor];
      const when = run.loopStart + event.time;
      if (when > horizon) break;
      scheduleTone(run.ctx, run.master, { ...event.tone, start: Math.max(0, when - now) });
      run.cursor += 1;
      if (run.cursor === run.events.length) {
        run.cursor = 0;
        run.loopStart += run.loopLength;
      }
    }
  }
}

// One shared engine: a single output loop must survive page navigation.
export const backgroundMusic = new BackgroundMusic();
