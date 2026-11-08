import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AnswerButton, type AnswerState } from '@/components/ui/AnswerButton';
import { LeoCoach } from '@/components/mascot/LeoCoach';
import { Confetti } from '@/components/Confetti';
import type { LeoMood } from '@/components/mascot/Leo';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import type { AgeGroup } from '@/data/types';
import { numberToWords } from '@/utils/numberWords';
import { randomInt, shuffle } from '@/utils/random';

type Operation = 'add' | 'subtract';

interface SumRound {
  left: number;
  right: number;
  operation: Operation;
  answer: number;
  options: number[];
}

function maxValueFor(ageGroup: AgeGroup): number {
  if (ageGroup === '2-3') return 5;
  if (ageGroup === '4-5') return 10;
  return 20;
}

function buildRound(ageGroup: AgeGroup): SumRound {
  const max = maxValueFor(ageGroup);
  const operation: Operation = ageGroup === '6' && Math.random() < 0.5 ? 'subtract' : 'add';
  let left: number;
  let right: number;
  let answer: number;
  if (operation === 'add') {
    left = randomInt(0, max);
    right = randomInt(0, max - left);
    answer = left + right;
  } else {
    left = randomInt(1, max);
    right = randomInt(0, left);
    answer = left - right;
  }
  const decoys = new Set<number>();
  while (decoys.size < 2) {
    const candidate = answer + randomInt(-3, 3);
    if (candidate !== answer && candidate >= 0 && candidate <= max * 2) decoys.add(candidate);
  }
  return { left, right, operation, answer, options: shuffle([answer, ...decoys]) };
}

const SYMBOL: Record<Operation, string> = { add: '+', subtract: '-' };

export function MathsChallenge() {
  const { progress, addStars, practise } = useProgress();
  const { speak, sfx, celebrate } = useAudio();
  const [round, setRound] = useState(() => buildRound(progress.ageGroup));
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [solved, setSolved] = useState(false);
  const [burst, setBurst] = useState(0);
  const [coach, setCoach] = useState<{ mood: LeoMood; message: string }>({
    mood: 'thinking',
    message: 'Look at the pictures, then tell me the answer!',
  });

  const pick = (value: number) => {
    if (solved || answers[value] === 'wrong') return;
    if (value === round.answer) {
      setAnswers({ [value]: 'correct' });
      setSolved(true);
      setBurst((count) => count + 1);
      addStars(1);
      practise('numbers', round.answer);
      celebrate();
      const message = `${numberToWords(round.left)} ${round.operation === 'add' ? 'plus' : 'take away'} ${numberToWords(round.right)} makes ${numberToWords(round.answer)}!`;
      setCoach({ mood: 'excited', message });
      return;
    }
    setAnswers((current) => ({ ...current, [value]: 'wrong' }));
    sfx('wrong');
    const message = 'Nearly! Count the pictures slowly and try again.';
    setCoach({ mood: 'encouraging', message });
    speak(message);
  };

  const nextRound = () => {
    setRound(buildRound(progress.ageGroup));
    setAnswers({});
    setSolved(false);
    setCoach({ mood: 'thinking', message: 'Here is a brand new sum for you!' });
  };

  const leftItems = Array.from({ length: round.left }, (_, index) => index);
  const rightItems = Array.from({ length: round.right }, (_, index) => index);
  const takenAway = round.operation === 'subtract';

  return (
    <div className="relative flex flex-col gap-6 rounded-4xl bg-white p-5 shadow-card sm:p-8">
      <Confetti burstKey={burst} />
      <LeoCoach mood={coach.mood} message={coach.message} leoSize={96} />

      <div className="flex min-h-[160px] flex-wrap items-center justify-center gap-3 rounded-3xl bg-mint-100 p-6" aria-label={`${round.left} ${SYMBOL[round.operation]} ${round.right}`}>
        {leftItems.map((index) => (
          <motion.span key={`l-${round.left}-${index}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.06, type: 'spring' }} className="text-4xl sm:text-5xl" aria-hidden>
            {'\u{1F34E}'}
          </motion.span>
        ))}
        <span className="font-display text-5xl text-ink-900">{SYMBOL[round.operation]}</span>
        {rightItems.map((index) => (
          <motion.span
            key={`r-${round.right}-${index}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1, opacity: takenAway ? 0.35 : 1 }}
            transition={{ delay: 0.3 + index * 0.06, type: 'spring' }}
            className="text-4xl sm:text-5xl"
            aria-hidden
          >
            {takenAway ? '\u{1F34E}' : '\u{1F34A}'}
          </motion.span>
        ))}
      </div>

      <p className="text-center font-display text-3xl text-ink-900">
        {round.left} {SYMBOL[round.operation]} {round.right} = ?
      </p>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {round.options.map((value) => (
          <AnswerButton key={value} state={answers[value] ?? 'idle'} onClick={() => pick(value)} ariaLabel={`Answer ${value}`}>
            {value}
          </AnswerButton>
        ))}
      </div>

      {solved && (
        <div className="flex justify-end">
          <Button variant="mint" onClick={nextRound}>
            Next sum
          </Button>
        </div>
      )}
    </div>
  );
}
