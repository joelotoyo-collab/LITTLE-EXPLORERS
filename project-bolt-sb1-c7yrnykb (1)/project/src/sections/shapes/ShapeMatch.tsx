import { useState } from 'react';
import { ShapeArt } from '@/components/ShapeArt';
import { AnswerButton, type AnswerState } from '@/components/ui/AnswerButton';
import { Button } from '@/components/ui/Button';
import { Confetti } from '@/components/Confetti';
import { SHAPES, type ShapeInfo } from '@/data/shapes';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { pickMany, pickOne } from '@/utils/random';

interface Round {
  target: ShapeInfo;
  options: ShapeInfo[];
}

function buildRound(previousId?: ShapeInfo['id']): Round {
  const target = pickOne(SHAPES.filter((shape) => shape.id !== previousId));
  const decoys = pickMany(
    SHAPES.filter((shape) => shape.id !== target.id),
    2,
  );
  return { target, options: pickMany([target, ...decoys], 3) };
}

export function ShapeMatch() {
  const { practise, addStars } = useProgress();
  const { speak, sfx, celebrate } = useAudio();
  const [round, setRound] = useState<Round>(() => buildRound());
  const [wrongIds, setWrongIds] = useState<ShapeInfo['id'][]>([]);
  const [solved, setSolved] = useState(false);
  const [burst, setBurst] = useState(0);

  const choose = (shape: ShapeInfo) => {
    if (solved || wrongIds.includes(shape.id)) return;
    if (shape.id === round.target.id) {
      setSolved(true);
      setBurst((count) => count + 1);
      addStars(1);
      practise('shapes', shape.id);
      celebrate();
    } else {
      setWrongIds((ids) => [...ids, shape.id]);
      sfx('wrong');
      speak('Good try! Look again.');
    }
  };

  const stateFor = (shape: ShapeInfo): AnswerState => {
    if (solved) return shape.id === round.target.id ? 'correct' : 'idle';
    return wrongIds.includes(shape.id) ? 'wrong' : 'idle';
  };

  const nextRound = () => {
    setRound(buildRound(round.target.id));
    setWrongIds([]);
    setSolved(false);
  };

  return (
    <div className="relative flex flex-col items-center gap-6 rounded-4xl bg-white p-6 shadow-card sm:p-8">
      <Confetti burstKey={burst} />
      <p className="font-display text-2xl text-ink-900 sm:text-3xl" aria-live="polite">
        Which one is a <span className="text-sky-700">{round.target.name.toLowerCase()}</span>?
      </p>
      <Button variant="sun" onClick={() => speak(`Which one is a ${round.target.name.toLowerCase()}?`)}>
        Hear the question
      </Button>
      <div className="grid w-full max-w-lg grid-cols-3 gap-4">
        {round.options.map((shape) => (
          <AnswerButton key={shape.id} state={stateFor(shape)} onClick={() => choose(shape)} ariaLabel={shape.name}>
            <ShapeArt shape={shape.id} color={shape.color} className="h-20 w-20" />
          </AnswerButton>
        ))}
      </div>
      {solved && (
        <Button variant="mint" onClick={nextRound}>
          Next shape
        </Button>
      )}
    </div>
  );
}
