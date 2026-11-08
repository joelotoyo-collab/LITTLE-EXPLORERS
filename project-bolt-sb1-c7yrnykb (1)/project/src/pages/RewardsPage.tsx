import { Award, Lock } from 'lucide-react';
import { PageTitle } from '@/components/ui/PageTitle';
import { useProgress } from '@/contexts/ProgressContext';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ANIMALS } from '@/data/animals';
import { COLOURS } from '@/data/colours';
import { SHAPES } from '@/data/shapes';
import type { ProgressState } from '@/data/types';
import { cn } from '@/utils/classNames';

interface Badge {
  id: string;
  title: string;
  emoji: string;
  description: string;
  earned: (progress: ProgressState) => boolean;
  progress: (progress: ProgressState) => { value: number; max: number };
}

const BADGES: Badge[] = [
  {
    id: 'alphabet-explorer',
    title: 'Alphabet Explorer',
    emoji: '\u{1F524}',
    description: 'Visit all 26 letters in ABC World.',
    earned: (p) => p.letters.length >= 26,
    progress: (p) => ({ value: p.letters.length, max: 26 }),
  },
  {
    id: 'number-champion',
    title: 'Number Champion',
    emoji: '\u{1F522}',
    description: 'Tap every number from 1 to 100.',
    earned: (p) => p.numbers.length >= 100,
    progress: (p) => ({ value: p.numbers.length, max: 100 }),
  },
  {
    id: 'animal-expert',
    title: 'Animal Expert',
    emoji: '\u{1F981}',
    description: `Meet all ${ANIMALS.length} animals in the Animal Kingdom.`,
    earned: (p) => p.animals.length >= ANIMALS.length,
    progress: (p) => ({ value: p.animals.length, max: ANIMALS.length }),
  },
  {
    id: 'colour-master',
    title: 'Colour Master',
    emoji: '\u{1F308}',
    description: `Explore all ${COLOURS.length} colours.`,
    earned: (p) => p.colours.length >= COLOURS.length,
    progress: (p) => ({ value: p.colours.length, max: COLOURS.length }),
  },
  {
    id: 'shape-detective',
    title: 'Shape Detective',
    emoji: '\u{1F537}',
    description: `Find all ${SHAPES.length} shapes.`,
    earned: (p) => p.shapes.length >= SHAPES.length,
    progress: (p) => ({ value: p.shapes.length, max: SHAPES.length }),
  },
  {
    id: 'super-learner',
    title: 'Super Learner',
    emoji: '\u{2B50}',
    description: 'Earn 50 stars by playing and exploring.',
    earned: (p) => p.stars >= 50,
    progress: (p) => ({ value: Math.min(p.stars, 50), max: 50 }),
  },
];

export function RewardsPage() {
  const { progress } = useProgress();
  const earnedCount = BADGES.filter((badge) => badge.earned(progress)).length;

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Rewards" subtitle="Collect badges by exploring every world. Keep going, explorer!" />

      <div className="flex flex-col gap-6 rounded-4xl bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sun-200 text-3xl" aria-hidden>
            {'\u{2B50}'}
          </span>
          <div>
            <p className="font-display text-4xl text-ink-900">{progress.stars}</p>
            <p className="text-base text-ink-700">stars collected</p>
          </div>
        </div>
        <div className="sm:w-80">
          <ProgressBar value={earnedCount} max={BADGES.length} label="Badges earned" colourClass="bg-sun-300" />
        </div>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BADGES.map((badge) => {
          const earned = badge.earned(progress);
          const { value, max } = badge.progress(progress);
          return (
            <li
              key={badge.id}
              className={cn(
                'flex flex-col gap-4 rounded-4xl p-6 shadow-soft transition duration-300',
                earned ? 'bg-mint-100' : 'bg-white',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-full text-4xl',
                    earned ? 'bg-sun-200' : 'bg-cream-200 grayscale',
                  )}
                  aria-hidden
                >
                  {badge.emoji}
                </span>
                {earned ? (
                  <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink-900">
                    <Award size={16} aria-hidden />
                    Earned
                  </span>
                ) : (
                  <Lock size={20} className="text-ink-600" aria-hidden />
                )}
              </div>
              <div>
                <p className="font-display text-xl text-ink-900">{badge.title}</p>
                <p className="mt-1 text-base leading-relaxed text-ink-700">{badge.description}</p>
              </div>
              <ProgressBar value={value} max={max} label={`${badge.title} progress`} colourClass="bg-sky-300" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
