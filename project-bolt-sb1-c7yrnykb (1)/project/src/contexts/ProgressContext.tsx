import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { readStoredObject, writeStoredObject } from '@/utils/storage';
import type { AgeGroup, ListKey, ProgressSettings, ProgressState } from '@/data/types';

const STORAGE_KEY = 'little-explorers-progress-v1';

const DEFAULT_PROGRESS: ProgressState = {
  onboarded: false,
  ageGroup: '4-5',
  settings: { soundOn: true, narrationOn: true, volume: 0.8, musicOn: true, musicVolume: 0.35, sfxOn: true },
  stars: 0,
  activities: 0,
  letters: [],
  numbers: [],
  animals: [],
  colours: [],
  shapes: [],
  songs: [],
  stories: [],
  gamesPlayed: {},
};

type Action =
  | { type: 'practise'; list: ListKey; value: string | number }
  | { type: 'stars'; amount: number }
  | { type: 'gamePlayed'; gameId: string }
  | { type: 'settings'; patch: Partial<ProgressSettings> }
  | { type: 'ageGroup'; ageGroup: AgeGroup }
  | { type: 'onboard'; ageGroup: AgeGroup }
  | { type: 'reset' };

function reducer(state: ProgressState, action: Action): ProgressState {
  switch (action.type) {
    case 'practise': {
      const current = state[action.list] as Array<string | number>;
      if (current.includes(action.value)) {
        return { ...state, activities: state.activities + 1 };
      }
      return {
        ...state,
        activities: state.activities + 1,
        [action.list]: [...current, action.value],
      } as ProgressState;
    }
    case 'stars':
      return { ...state, stars: state.stars + action.amount };
    case 'gamePlayed':
      return {
        ...state,
        gamesPlayed: {
          ...state.gamesPlayed,
          [action.gameId]: (state.gamesPlayed[action.gameId] ?? 0) + 1,
        },
      };
    case 'settings':
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case 'ageGroup':
      return { ...state, ageGroup: action.ageGroup };
    case 'onboard':
      return { ...state, onboarded: true, ageGroup: action.ageGroup };
    case 'reset':
      return { ...DEFAULT_PROGRESS, onboarded: true, ageGroup: state.ageGroup, settings: state.settings };
    default:
      return state;
  }
}

function loadProgress(): ProgressState {
  const stored = readStoredObject<ProgressState>(STORAGE_KEY);
  if (!stored) return DEFAULT_PROGRESS;
  return {
    ...DEFAULT_PROGRESS,
    ...stored,
    settings: { ...DEFAULT_PROGRESS.settings, ...stored.settings },
  };
}

interface ProgressContextValue {
  progress: ProgressState;
  practise: (list: ListKey, value: string | number) => void;
  addStars: (amount: number) => void;
  recordGamePlayed: (gameId: string) => void;
  updateSettings: (patch: Partial<ProgressSettings>) => void;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  completeOnboarding: (ageGroup: AgeGroup) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, undefined, loadProgress);

  useEffect(() => {
    writeStoredObject(STORAGE_KEY, progress);
  }, [progress]);

  const practise = useCallback((list: ListKey, value: string | number) => {
    dispatch({ type: 'practise', list, value });
  }, []);
  const addStars = useCallback((amount: number) => dispatch({ type: 'stars', amount }), []);
  const recordGamePlayed = useCallback((gameId: string) => dispatch({ type: 'gamePlayed', gameId }), []);
  const updateSettings = useCallback((patch: Partial<ProgressSettings>) => dispatch({ type: 'settings', patch }), []);
  const setAgeGroup = useCallback((ageGroup: AgeGroup) => dispatch({ type: 'ageGroup', ageGroup }), []);
  const completeOnboarding = useCallback((ageGroup: AgeGroup) => dispatch({ type: 'onboard', ageGroup }), []);
  const resetProgress = useCallback(() => dispatch({ type: 'reset' }), []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      practise,
      addStars,
      recordGamePlayed,
      updateSettings,
      setAgeGroup,
      completeOnboarding,
      resetProgress,
    }),
    [progress, practise, addStars, recordGamePlayed, updateSettings, setAgeGroup, completeOnboarding, resetProgress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used inside ProgressProvider');
  return context;
}
