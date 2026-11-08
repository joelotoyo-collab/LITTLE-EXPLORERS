import { ChevronLeft, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PageTitle } from '@/components/ui/PageTitle';
import { Segmented } from '@/components/ui/Segmented';
import { type AgeGroup, type Difficulty } from '@/data/types';
import { useProgress } from '@/contexts/ProgressContext';
import { navigateTo } from '@/hooks/useRoute';
import { GAMES } from '@/sections/play/catalog';
import { GameView } from '@/sections/play/GameView';

const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
];

const DEFAULT_DIFFICULTY: Record<AgeGroup, Difficulty> = { '2-3': 'easy', '4-5': 'medium', '6': 'hard' };

export function PlayLearnPage({ gameId }: { gameId?: string }) {
  const { progress } = useProgress();
  const [difficulty, setDifficulty] = useState<Difficulty>(DEFAULT_DIFFICULTY[progress.ageGroup]);
  const game = GAMES.find((item) => item.id === gameId);

  if (game) {
    return (
      <div className="flex flex-col gap-8">
        <PageTitle title={`${game.emoji} ${game.title}`} subtitle={game.blurb} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button variant="ghost" onClick={() => navigateTo('play')}>
            <ChevronLeft size={20} aria-hidden />
            All games
          </Button>
          <Segmented name="play-difficulty" options={DIFFICULTIES} value={difficulty} onChange={setDifficulty} />
        </div>
        <GameView gameId={game.id} difficulty={difficulty} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Play & Learn" subtitle="Ten little games to test what you have learned. Pick one to start." />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((item) => {
          const plays = progress.gamesPlayed[item.id] ?? 0;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => navigateTo(`play/${item.id}`)}
                className="flex w-full items-center gap-4 rounded-4xl bg-white p-5 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-sun-100 text-4xl" aria-hidden>
                  {item.emoji}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-display text-xl text-ink-900">{item.title}</span>
                  <span className="text-base leading-snug text-ink-700">{item.blurb}</span>
                  <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink-700">
                    <Star size={14} aria-hidden />
                    {plays > 0 ? `Played ${plays} ${plays === 1 ? 'time' : 'times'}` : 'Not played yet'}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
