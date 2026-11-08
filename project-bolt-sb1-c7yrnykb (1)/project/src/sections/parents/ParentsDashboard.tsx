import { Lock, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/contexts/ProgressContext';
import { ANIMALS } from '@/data/animals';
import { COLOURS } from '@/data/colours';
import { SHAPES } from '@/data/shapes';
import { AGE_GROUPS, type AgeGroup } from '@/data/types';
import { cn } from '@/utils/classNames';
import { AudioSettings } from '@/sections/parents/AudioSettings';

interface ParentsDashboardProps {
  onLock: () => void;
}

function recommendations(counts: { letters: number; numbers: number; animals: number; colours: number; shapes: number }): string[] {
  const tips: string[] = [];
  if (counts.letters < 26) tips.push('Visit ABC World together and practise a few new letters each day.');
  if (counts.numbers < 20) tips.push('Count everyday objects in Number World to build confidence with numbers.');
  if (counts.animals < ANIMALS.length) tips.push('Ask your child to make an animal sound from the Animal Kingdom.');
  if (counts.colours < COLOURS.length) tips.push('Play Colour Hunt on a walk and spot colours around you.');
  if (counts.shapes < SHAPES.length) tips.push('Look for circles, squares and triangles in your home.');
  if (tips.length === 0) tips.push('Your explorer is doing wonderfully. Try the harder difficulty in Play & Learn.');
  return tips.slice(0, 3);
}

export function ParentsDashboard({ onLock }: ParentsDashboardProps) {
  const { progress, setAgeGroup, resetProgress } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);
  const totalGames = Object.values(progress.gamesPlayed).reduce((sum, count) => sum + count, 0);
  const counts = {
    letters: progress.letters.length,
    numbers: progress.numbers.length,
    animals: progress.animals.length,
    colours: progress.colours.length,
    shapes: progress.shapes.length,
  };

  const stats = [
    { label: 'Stars earned', value: progress.stars },
    { label: 'Activities completed', value: progress.activities },
    { label: 'Games played', value: totalGames },
    { label: 'Stories finished', value: progress.stories.length },
    { label: 'Songs listened to', value: progress.songs.length },
  ];

  const confirm = () => {
    resetProgress();
    setConfirmReset(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-5 rounded-4xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-display text-2xl text-ink-900">Progress at a glance</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <li key={stat.label} className="rounded-3xl bg-cream-100 p-4">
              <p className="font-display text-3xl text-ink-900">{stat.value}</p>
              <p className="mt-1 text-sm text-ink-700">{stat.label}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4">
          <ProgressBar value={counts.letters} max={26} label="Letters explored" colourClass="bg-sky-300" />
          <ProgressBar value={counts.numbers} max={100} label="Numbers explored" colourClass="bg-mint-300" />
          <ProgressBar value={counts.animals} max={ANIMALS.length} label="Animals met" colourClass="bg-sun-300" />
        </div>
        <div className="rounded-3xl bg-sky-100 p-5">
          <p className="font-display text-lg text-ink-900">Ideas for next time</p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-800">
            {recommendations(counts).map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-4xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-display text-2xl text-ink-900">Age level</h2>
        <p className="text-base text-ink-700">Changes which numbers and difficulty levels are suggested.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {AGE_GROUPS.map((group) => (
            <button
              key={group.id}
              type="button"
              aria-pressed={progress.ageGroup === group.id}
              onClick={() => setAgeGroup(group.id as AgeGroup)}
              className={cn(
                'flex items-center gap-3 rounded-3xl p-4 text-left transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300',
                progress.ageGroup === group.id ? 'bg-sun-200 ring-4 ring-sun-400' : 'bg-cream-50 hover:bg-cream-100',
              )}
            >
              <span className="text-3xl" aria-hidden>
                {group.emoji}
              </span>
              <span>
                <span className="block font-display text-lg text-ink-900">{group.label}</span>
                <span className="block text-sm text-ink-700">{group.blurb}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <AudioSettings />

      <section className="flex flex-col gap-4 rounded-4xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-display text-2xl text-ink-900">Reset progress</h2>
        <p className="text-base leading-relaxed text-ink-700">
          This clears stars, badges and everything your explorer has discovered on this device. Sound and age settings are kept.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="coral" onClick={() => setConfirmReset(true)}>
            <RotateCcw size={20} aria-hidden />
            Reset progress
          </Button>
          <Button variant="ghost" onClick={onLock}>
            <Lock size={20} aria-hidden />
            Lock Parents' Corner
          </Button>
        </div>
      </section>

      <Modal open={confirmReset} title="Reset all progress?" onClose={() => setConfirmReset(false)}>
        <div className="flex flex-col gap-5">
          <p className="text-lg leading-relaxed text-ink-800">
            Stars, badges and discoveries will be cleared. This cannot be undone on this device.
          </p>
          <div className="flex flex-wrap justify-end gap-3">
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Keep progress
            </Button>
            <Button variant="coral" onClick={confirm}>
              Yes, reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
