import { useState } from 'react';
import { PageTitle } from '@/components/ui/PageTitle';
import { Segmented } from '@/components/ui/Segmented';
import { CountChallenge } from '@/sections/numbers/CountChallenge';
import { MathsChallenge } from '@/sections/numbers/MathsChallenge';
import { NumberLearn } from '@/sections/numbers/NumberLearn';
import { useProgress } from '@/contexts/ProgressContext';

type NumberMode = 'learn' | 'count' | 'maths';

const MODES: { id: NumberMode; label: string; emoji: string }[] = [
  { id: 'learn', label: 'Learn', emoji: '\u{1F4DA}' },
  { id: 'count', label: 'Count it', emoji: '\u{1F9EE}' },
  { id: 'maths', label: 'Add & take away', emoji: '\u{2795}' },
];

export function NumberWorldPage() {
  const { progress } = useProgress();
  const [mode, setMode] = useState<NumberMode>('learn');
  const countMax = progress.ageGroup === '2-3' ? 5 : progress.ageGroup === '4-5' ? 10 : 20;

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Number World" subtitle="Tap a number to hear it, count the friends, then try a sum." />
      <Segmented name="number-mode" options={MODES} value={mode} onChange={setMode} />
      {mode === 'learn' && <NumberLearn />}
      {mode === 'count' && <CountChallenge key={countMax} maxCount={countMax} />}
      {mode === 'maths' && <MathsChallenge />}
    </div>
  );
}
