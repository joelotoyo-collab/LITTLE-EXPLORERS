import { useEffect } from 'react';
import { backgroundMusic } from '@/audio/BackgroundMusic';
import { themeForRoute } from '@/audio/musicThemes';
import { useProgress } from '@/contexts/ProgressContext';
import { useRoute } from '@/hooks/useRoute';

const FIRST_INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const;

export function MusicController() {
  const { progress } = useProgress();
  const route = useRoute();
  const { musicOn, musicVolume } = progress.settings;

  useEffect(() => {
    const unlock = () => backgroundMusic.unlock();
    FIRST_INTERACTION_EVENTS.forEach((event) => window.addEventListener(event, unlock));
    return () => FIRST_INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, unlock));
  }, []);

  useEffect(() => {
    backgroundMusic.setEnabled(musicOn);
  }, [musicOn]);

  useEffect(() => {
    backgroundMusic.setVolume(musicVolume);
  }, [musicVolume]);

  useEffect(() => {
    backgroundMusic.setTheme(themeForRoute(route.name));
  }, [route.name]);

  return null;
}
