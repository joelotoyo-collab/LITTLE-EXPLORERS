import { getAudioContext, scheduleTone } from '@/audio/sfx';

type Syllable = readonly [fromHz: number, toHz: number, seconds: number];

interface AnimalVoice {
  wave: OscillatorType;
  gain: number;
  syllables: readonly Syllable[];
}

const SYLLABLE_GAP = 0.12;

const ANIMAL_VOICES: Record<string, AnimalVoice> = {
  cow: { wave: 'sawtooth', gain: 0.1, syllables: [[180, 130, 0.9]] },
  sheep: { wave: 'triangle', gain: 0.22, syllables: [[420, 380, 0.25], [440, 400, 0.25], [460, 380, 0.3]] },
  goat: { wave: 'triangle', gain: 0.2, syllables: [[500, 400, 0.25], [480, 380, 0.3]] },
  horse: { wave: 'sawtooth', gain: 0.07, syllables: [[700, 520, 0.2], [600, 900, 0.5]] },
  pig: { wave: 'square', gain: 0.08, syllables: [[260, 180, 0.12], [280, 190, 0.12], [250, 170, 0.14]] },
  chicken: { wave: 'square', gain: 0.07, syllables: [[900, 1100, 0.06], [1000, 760, 0.06], [900, 1150, 0.06], [1000, 760, 0.06], [1100, 800, 0.08]] },
  duck: { wave: 'square', gain: 0.09, syllables: [[660, 330, 0.14], [620, 300, 0.18]] },
  lion: { wave: 'sawtooth', gain: 0.1, syllables: [[120, 80, 1.1]] },
  elephant: { wave: 'sawtooth', gain: 0.07, syllables: [[260, 120, 0.5], [200, 160, 0.8]] },
  giraffe: { wave: 'triangle', gain: 0.2, syllables: [[300, 240, 0.4], [250, 200, 0.5]] },
  monkey: { wave: 'triangle', gain: 0.2, syllables: [[700, 900, 0.12], [700, 900, 0.12], [800, 1000, 0.2]] },
  zebra: { wave: 'triangle', gain: 0.2, syllables: [[500, 800, 0.15], [800, 400, 0.2]] },
  bear: { wave: 'sawtooth', gain: 0.1, syllables: [[110, 70, 0.9]] },
  fish: { wave: 'sine', gain: 0.2, syllables: [[300, 600, 0.1], [600, 300, 0.1], [300, 600, 0.1]] },
  dolphin: { wave: 'sine', gain: 0.18, syllables: [[1400, 2200, 0.05], [2200, 1500, 0.05], [1600, 2600, 0.05], [2600, 1700, 0.06]] },
  octopus: { wave: 'sine', gain: 0.25, syllables: [[240, 120, 0.25]] },
  whale: { wave: 'sine', gain: 0.25, syllables: [[300, 150, 1.4]] },
  owl: { wave: 'sine', gain: 0.25, syllables: [[480, 440, 0.35], [480, 440, 0.5]] },
  penguin: { wave: 'square', gain: 0.07, syllables: [[500, 380, 0.25], [520, 400, 0.3]] },
  parrot: { wave: 'triangle', gain: 0.2, syllables: [[1200, 1600, 0.15], [1600, 1100, 0.15], [1300, 1800, 0.25]] },
  butterfly: { wave: 'sine', gain: 0.12, syllables: [[900, 1100, 0.1], [1100, 900, 0.1], [900, 1100, 0.1]] },
  bee: { wave: 'sawtooth', gain: 0.04, syllables: [[220, 260, 0.9]] },
  ladybug: { wave: 'sawtooth', gain: 0.05, syllables: [[300, 320, 0.6]] },
  dog: { wave: 'triangle', gain: 0.3, syllables: [[500, 260, 0.18], [500, 260, 0.18]] },
  cat: { wave: 'triangle', gain: 0.18, syllables: [[600, 900, 0.35], [900, 500, 0.4]] },
  rabbit: { wave: 'sine', gain: 0.25, syllables: [[120, 80, 0.12], [120, 80, 0.12]] },
};

export function playAnimalSound(animalId: string, volume: number): void {
  const ctx = getAudioContext();
  const voice = ANIMAL_VOICES[animalId];
  if (!ctx || !voice) return;
  const master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);
  let start = 0;
  for (const [from, to, seconds] of voice.syllables) {
    scheduleTone(ctx, master, { freq: from, endFreq: to, duration: seconds, type: voice.wave, gain: voice.gain, start });
    start += seconds + SYLLABLE_GAP;
  }
  window.setTimeout(() => master.disconnect(), (start + 0.5) * 1000);
}
