import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AnswerButton, type AnswerState } from '@/components/ui/AnswerButton';
import { Confetti } from '@/components/Confetti';
import { COLOURS, type ColourInfo } from '@/data/colours';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { pickMany, pickOne, shuffle } from '@/utils/random';

interface Option {
  key: string;
  emoji: string;
  colourId: string;
}

interface Round {
  target: ColourInfo;
  options: Option[];
}

function buildRound(previousId?: string): Round {
  const candidates = COLOURS.filter((colour) => colour.id !== previousId);
  const target = pickOne(candidates);
  const others = pickMany(
    COLOURS.filter((colour) => colour.id !== target.id),
    4,
  );
  const targetObjects = pickMany(target.objects, 2);
  const options: Option[] = [
    ...targetObjects.map((emoji) => ({ key: `t-${emoji}`, emoji, colourId: target.id })),
    ...others.map((colour) => ({ key: `o-${colour.id}`, emoji: pickOne(colour.objects), colourId: colour.id })),
  ];
  return { target, options: shuffle(options) };
}

export function ColourFind() {
  const { practise, addStars } = useProgress();
  const { speak, sfx, celebrate } = useAudio();
  const [round, setRound] = useState<Round>(() => buildRound());
  const [wrongKeys, setWrongKeys] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    speak(`Can you find something ${round.target.name.toLowerCase()}?`);
  }, [round, speak]);

  const choose = (option: Option) => {
    if (solved || wrongKeys.includes(option.key)) return;
    if (option.colourId === round.target.id) {
      setSolved(true);
      setBurst((count) => count + 1);
      addStars(1);
      practise('colours', round.target.id);
      celebrate();
    } else {
      setWrongKeys((keys) => [...keys, option.key]);
      sfx('wrong');
      speak('Not quite. Try another one!');
    }
  };

  const nextRound = () => {
    setRound(buildRound(round.target.id));
    setWrongKeys([]);
    setSolved(false);
  };

  const stateFor = (option: Option): AnswerState => {
    if (solved) return option.colourId === round.target.id ? 'correct' : 'idle';
    return wrongKeys.includes(option.key) ? 'wrong' : 'idle';
  };

  return (
    <div className="relative flex flex-col items-center gap-6 rounded-4xl bg-white p-6 shadow-card sm:p-8">
      <Confetti burstKey={burst} />
      <p className="font-display text-2xl text-ink-900 sm:text-3xl" aria-live="polite">
        Find something <span className="text-sky-700">{round.target.name.toUpperCase()}</span>!
      </p>
      <div className="grid w-full max-w-md grid-cols-3 gap-4">
        {round.options.map((option) => (
          <AnswerButton
            key={option.key}
            state={stateFor(option)}
            onClick={() => choose(option)}
            ariaLabel={`Object ${option.emoji}`}
          >
            <span className="text-5xl" aria-hidden>
              {option.emoji}
            </span>
          </AnswerButton>
        ))}
      </div>
      {solved && (
        <div className="flex flex-col items-center gap-3">
          <p className="font-display text-xl text-ink-900">Brilliant! You found {round.target.name.toLowerCase()}.</p>
          <Button variant="mint" onClick={nextRound}>
            Next colour
          </Button>
        </div>
      )}
    </div>
  );
}
