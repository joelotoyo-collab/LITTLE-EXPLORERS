import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { AnswerButton, type AnswerState } from '@/components/ui/AnswerButton';
import { Button } from '@/components/ui/Button';
import { Confetti } from '@/components/Confetti';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import type { Difficulty, ListKey } from '@/data/types';

export interface ChoiceOption {
  key: string;
  label: ReactNode;
  ariaLabel: string;
  correct: boolean;
}

export interface ChoiceRound {
  prompt: string;
  visual?: ReactNode;
  options: ChoiceOption[];
  practise?: { list: ListKey; value: string | number };
}

export type ChoiceBuilder = (difficulty: Difficulty) => ChoiceRound;

const ROUNDS = 8;

interface ChoiceGameProps {
  gameId: string;
  difficulty: Difficulty;
  build: ChoiceBuilder;
}

export function ChoiceGame({ gameId, difficulty, build }: ChoiceGameProps) {
  const { practise, addStars, recordGamePlayed } = useProgress();
  const { speak, sfx, celebrate } = useAudio();
  const [round, setRound] = useState<ChoiceRound>(() => build(difficulty));
  const [roundNumber, setRoundNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [wrongKeys, setWrongKeys] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [finished, setFinished] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    speak(round.prompt);
  }, [round, speak]);

  useEffect(() => {
    if (finished) {
      recordGamePlayed(gameId);
      sfx('complete');
    }
  }, [finished, gameId, recordGamePlayed, sfx]);

  const choose = (option: ChoiceOption) => {
    if (solved || wrongKeys.includes(option.key)) return;
    if (option.correct) {
      setSolved(true);
      setScore((value) => value + 1);
      setBurst((count) => count + 1);
      addStars(1);
      if (round.practise) practise(round.practise.list, round.practise.value);
      celebrate();
    } else {
      setWrongKeys((keys) => [...keys, option.key]);
      sfx('wrong');
      speak('So close. Try again!');
    }
  };

  const advance = () => {
    if (roundNumber >= ROUNDS) {
      setFinished(true);
      return;
    }
    setRoundNumber(roundNumber + 1);
    setRound(build(difficulty));
    setWrongKeys([]);
    setSolved(false);
  };

  const restart = () => {
    setRound(build(difficulty));
    setRoundNumber(1);
    setScore(0);
    setWrongKeys([]);
    setSolved(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-4xl bg-white p-8 text-center shadow-card">
        <Trophy size={64} className="text-sun-500" aria-hidden />
        <p className="font-display text-3xl text-ink-900">Great playing!</p>
        <p className="text-lg text-ink-800">
          You got {score} out of {ROUNDS} right and earned {score} stars.
        </p>
        <Button variant="primary" onClick={restart}>
          <RotateCcw size={20} aria-hidden />
          Play again
        </Button>
      </div>
    );
  }

  const stateFor = (option: ChoiceOption): AnswerState => {
    if (solved) return option.correct ? 'correct' : 'idle';
    return wrongKeys.includes(option.key) ? 'wrong' : 'idle';
  };

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden rounded-4xl bg-white p-6 shadow-card sm:p-8">
      <Confetti burstKey={burst} />
      <div className="flex flex-wrap items-center justify-between gap-3 text-base font-semibold text-ink-800">
        <span>
          Round {roundNumber} of {ROUNDS}
        </span>
        <span>Score {score}</span>
      </div>

      <motion.p
        key={round.prompt}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display text-2xl text-ink-900 sm:text-3xl"
        aria-live="polite"
      >
        {round.prompt}
      </motion.p>

      {round.visual && <div className="flex justify-center">{round.visual}</div>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {round.options.map((option) => (
          <AnswerButton
            key={option.key}
            state={stateFor(option)}
            onClick={() => choose(option)}
            ariaLabel={option.ariaLabel}
          >
            {option.label}
          </AnswerButton>
        ))}
      </div>

      <div className="flex min-h-[52px] items-center justify-center">
        {solved && (
          <Button variant="mint" onClick={advance}>
            {roundNumber >= ROUNDS ? 'See my results' : 'Next'}
            <ArrowRight size={20} aria-hidden />
          </Button>
        )}
      </div>
    </div>
  );
}
