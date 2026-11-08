import { playSfx } from '@/audio/sfx';
import { speakText } from '@/audio/speech';

const CELEBRATION_PHRASES = ['Yaaay!', 'Well done!', 'Amazing!', 'You did it!', 'Super!', 'Fantastic!'] as const;

export function playCelebration(volume: number, options: { jingle: boolean; voice: boolean }): void {
  if (options.jingle) playSfx('celebrate', volume);
  if (!options.voice) return;
  const phrase = CELEBRATION_PHRASES[Math.floor(Math.random() * CELEBRATION_PHRASES.length)];
  const pitch = 1.5 + Math.random() * 0.3;
  window.setTimeout(() => speakText(phrase, volume, { pitch, rate: 1.05 }), options.jingle ? 700 : 0);
}
