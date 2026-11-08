import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PageTitle } from '@/components/ui/PageTitle';
import { ParentsDashboard } from '@/sections/parents/ParentsDashboard';
import { randomInt } from '@/utils/random';

interface GateQuestion {
  left: number;
  right: number;
  options: number[];
}

function makeQuestion(): GateQuestion {
  const left = randomInt(6, 9);
  const right = randomInt(6, 9);
  const answer = left * right;
  const options = [answer, answer + randomInt(2, 6), answer - randomInt(2, 5)];
  return { left, right, options: options.sort((a, b) => a - b) };
}

export function ParentsCornerPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [question, setQuestion] = useState<GateQuestion>(() => makeQuestion());
  const [wrong, setWrong] = useState(false);
  const answer = question.left * question.right;

  const attempt = (value: number) => {
    if (value === answer) {
      setUnlocked(true);
      setWrong(false);
      return;
    }
    setWrong(true);
    setQuestion(makeQuestion());
  };

  if (unlocked) {
    return (
      <div className="flex flex-col gap-8">
        <PageTitle title="Parents' Corner" subtitle="Progress, age level, sound and reset options for grown-ups." />
        <ParentsDashboard onLock={() => setUnlocked(false)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Parents' Corner" subtitle="A quick check so that children can't change these settings by accident." />
      <section className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-4xl bg-white p-6 text-center shadow-card sm:p-8">
        <p className="font-display text-2xl text-ink-900">
          What is {question.left} &times; {question.right}?
        </p>
        <div className="grid w-full grid-cols-3 gap-3">
          {question.options.map((option) => (
            <Button key={option} variant="ghost" onClick={() => attempt(option)} className="w-full">
              {option}
            </Button>
          ))}
        </div>
        {wrong && <p className="text-base text-ink-700">Not quite. Here is a new question to try.</p>}
      </section>
    </div>
  );
}
