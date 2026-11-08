import { useCallback } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { playSfx, type SfxName } from '@/audio/sfx';
import { speakText } from '@/audio/speech';
import { playCelebration } from '@/audio/celebration';
import { playAnimalSound } from '@/audio/animalSounds';

export function useAudio() {
  const { progress } = useProgress();
  const { soundOn, narrationOn, sfxOn, volume } = progress.settings;

  const speak = useCallback(
    (text: string) => {
      if (!soundOn || !narrationOn) return;
      if (!speakText(text, volume) && sfxOn) playSfx('pop', volume);
    },
    [soundOn, narrationOn, sfxOn, volume],
  );

  const sfx = useCallback(
    (name: SfxName) => {
      if (!soundOn || !sfxOn) return;
      playSfx(name, volume);
    },
    [soundOn, sfxOn, volume],
  );

  const celebrate = useCallback(() => {
    if (!soundOn) return;
    playCelebration(volume, { jingle: sfxOn, voice: narrationOn });
  }, [soundOn, sfxOn, narrationOn, volume]);

  const playAnimal = useCallback(
    (animalId: string) => {
      if (!soundOn || !sfxOn) return;
      playAnimalSound(animalId, volume);
    },
    [soundOn, sfxOn, volume],
  );

  return { speak, sfx, celebrate, playAnimal, soundOn, narrationOn, volume };
}
