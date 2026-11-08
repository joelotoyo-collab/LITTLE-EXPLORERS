export type AgeGroup = '2-3' | '4-5' | '6';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ListKey = 'letters' | 'numbers' | 'animals' | 'colours' | 'shapes' | 'songs' | 'stories';

export interface ProgressSettings {
  soundOn: boolean;
  narrationOn: boolean;
  volume: number;
  musicOn: boolean;
  musicVolume: number;
  sfxOn: boolean;
}

export interface ProgressState {
  onboarded: boolean;
  ageGroup: AgeGroup;
  settings: ProgressSettings;
  stars: number;
  activities: number;
  letters: string[];
  numbers: number[];
  animals: string[];
  colours: string[];
  shapes: string[];
  songs: string[];
  stories: string[];
  gamesPlayed: Record<string, number>;
}

export const AGE_GROUPS: { id: AgeGroup; label: string; blurb: string; emoji: string }[] = [
  { id: '2-3', label: 'Ages 2-3', blurb: 'Sounds, shapes and first words', emoji: '\u{1F423}' },
  { id: '4-5', label: 'Ages 4-5', blurb: 'Letters, counting and colours', emoji: '\u{1F981}' },
  { id: '6', label: 'Age 6', blurb: 'Reading, adding and bigger numbers', emoji: '\u{1F680}' },
];
