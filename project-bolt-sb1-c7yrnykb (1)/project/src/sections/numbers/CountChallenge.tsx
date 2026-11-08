import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { numberToWords } from '@/utils/numberWords';
import { pickOne, randomInt, shuffle } from '@/utils/random';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AnswerButton, type AnswerState } from '@/components/ui/AnswerButton';
import { LeoCoach } from '@/components/mascot/LeoCoach';
import { Confetti } from '@/components/Confetti';
import type { LeoMood } from '@/components/mascot/Leo';

const COUNTABLES = [
  { emoji: '\u{1F34E}', plural: 'apples' },
  { emoji: '\u{2B50}', plural: 'stars' },
  { emoji: '\u{1F98B}', plural: 'butterflies' },
  { emoji: '\u{1F41F}', plural: 'fish' },
  { emoji: '\u{1F338}', plural: 'flowers' },
  { emoji: '\u{1F388}', plural: 'balloons' },
];

interface CountRound {
  target: number;
  emoji: string;
  plural: string;
  options: number[];
}

function buildRound(maxCount: number): CountRound {
  const target = randomInt(1, maxCount);
  const candidates = Array.from({ length: maxCount + 3 }, (_, index) => index + 1).filter((value) => value !== target);
  const decoys = shuffle(candidates).slice(0, 2);
  const countable = pickOne(COUNTABLES);
  return { target, emoji: countable.emoji, plural: countable.plural, options: shuffle([target, ...decoys]) };
}

interface CountChallengeProps {
  maxCount: number;
}

export function CountChallenge({ maxCount }: CountChallengeProps) {
  const { practise, addStars } = useProgress();
  const { speak, sfx, celebrate } = useAudio();
  const [round, setRound] = useState(() => buildRound(maxCount));
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [solved, setSolved] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);
  const [burst, setBurst] = useState(0);
  const [coach, setCoach] = useState<{ mood: LeoMood; message: string }>({
    mood: 'thinking',
    message: 'How many can you count? Tap your answer!',
  });

  const objects = useMemo(() => Array.from({ length: round.target }, (_, index) => index), [round.target]);

  const pick = (value: number) => {
    if (solved || answers[value] === 'wrong') return;
    if (value === round.target) {
      setAnswers({ [value]: 'correct' });
      setSolved(true);
      setSolvedCount((count) => count + 1);
      setBurst((count) => count + 1);
      practise('numbers', round.target);
      addStars(1);
      celebrate();
      const message = `Yes! ${numberToWords(round.target)} ${round.plural}!`;
      setCoach({ mood: 'excited', message });
      return;
    }
    setAnswers((current) => ({ ...current, [value]: 'wrong' }));
    sfx('wrong');
    const message = 'Almost! Count them again, one at a time.';
    setCoach({ mood: 'encouraging', message });
    speak(message);
  };

  const nextRound = () => {
    setRound(buildRound(maxCount));
    setAnswers({});
    setSolved(false);
    setCoach({ mood: 'thinking', message: 'Let us count something new!' });
  };

  return (
    <div className="relative flex flex-col gap-6 rounded-4xl bg-white p-5 shadow-card sm:p-8">
      <Confetti burstKey={burst} />
      <LeoCoach mood={coach.mood} message={coach.message} leoSize={96} />

      <div className="flex min-h-[180px] flex-wrap items-center justify-center gap-3 rounded-3xl bg-sun-100 p-6" aria-label={`${round.target} ${round.plural}`}>
        {objects.map((index) => (
          <motion.span
            key={`${round.target}-${index}`}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 14 }}
            className="text-5xl sm:text-6xl"
            aria-hidden
          >
            {round.emoji}
          </motion.span>
        ))}
      </div>

      <p className="text-center font-display text-2xl text-ink-900">How many {round.plural} can you count?</p>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {round.options.map((value) => (
          <AnswerButton
            key={value}
            state={answers[value] ?? 'idle'}
            onClick={() => pick(value)}
            ariaLabel={`Answer ${value}`}
          >
            {value}
          </AnswerButton>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-ink-700">Solved: {solvedCount}</span>
        {solved && (
          <Button variant="mint" onClick={nextRound}>
            Next challenge
          </Button>
        )}
      </div>
      <ProgressBar value={solvedCount % 10} max={10} label="Counting streak" colourClass="bg-sun-300" />
    </div>
  );
}
