import type { RouteName } from '@/hooks/useRoute';

export type MusicTheme = 'home' | 'learn' | 'play';

export type NoteEvent = readonly [pitch: string | null, beats: number];

export interface MusicThemeDef {
  bpm: number;
  melody: readonly NoteEvent[];
  bass: readonly NoteEvent[];
  beat: boolean;
}

function bassFromChords(chords: readonly (readonly string[])[]): NoteEvent[] {
  return chords.flatMap(([root, fifth, top]) => [
    [root, 0.5],
    [top, 0.5],
    [fifth, 0.5],
    [top, 0.5],
    [root, 0.5],
    [top, 0.5],
    [fifth, 0.5],
    [top, 0.5],
  ]);
}

const HOME_MELODY: NoteEvent[] = [
  ['E5', 1], ['G5', 1], ['C6', 2], ['G5', 1], ['E5', 1], ['D5', 1], ['C5', 1],
  ['A5', 1], ['G5', 1], ['F5', 1], ['E5', 1], ['D5', 2], ['C5', 1], ['D5', 1],
];

const LEARN_MELODY: NoteEvent[] = [
  ['F4', 1.5], ['A4', 0.5], ['C5', 1], ['A4', 1], ['G4', 2], ['F4', 2],
  ['E4', 1], ['F4', 1], ['G4', 1], ['A4', 1], ['C5', 2], ['A4', 1], ['G4', 1],
];

const PLAY_MELODY: NoteEvent[] = [
  ['G4', 0.5], ['B4', 0.5], ['D5', 1], ['G5', 0.5], ['F#5', 0.5], ['D5', 1], ['B4', 1], ['G4', 1], ['A4', 2],
  ['C5', 0.5], ['E5', 0.5], ['G5', 1], ['E5', 0.5], ['D5', 0.5], ['B4', 1], ['C5', 1], ['D5', 1], ['G4', 2],
];

export const MUSIC_THEMES: Record<MusicTheme, MusicThemeDef> = {
  home: {
    bpm: 116,
    melody: HOME_MELODY,
    bass: bassFromChords([
      ['C2', 'G2', 'E3'],
      ['A1', 'E2', 'A2'],
      ['F1', 'C2', 'F2'],
      ['G1', 'D2', 'G2'],
    ]),
    beat: true,
  },
  learn: {
    bpm: 92,
    melody: LEARN_MELODY,
    bass: bassFromChords([
      ['F2', 'C3', 'A3'],
      ['D2', 'A2', 'F3'],
      ['A#1', 'F2', 'D3'],
      ['C2', 'G2', 'E3'],
    ]),
    beat: false,
  },
  play: {
    bpm: 128,
    melody: PLAY_MELODY,
    bass: bassFromChords([
      ['G2', 'D3', 'B3'],
      ['E2', 'B2', 'G3'],
      ['C2', 'G2', 'E3'],
      ['D2', 'A2', 'F#3'],
    ]),
    beat: true,
  },
};

export function themeForRoute(route: RouteName): MusicTheme {
  if (route === 'home') return 'home';
  if (route === 'play' || route === 'music' || route === 'rewards') return 'play';
  return 'learn';
}
