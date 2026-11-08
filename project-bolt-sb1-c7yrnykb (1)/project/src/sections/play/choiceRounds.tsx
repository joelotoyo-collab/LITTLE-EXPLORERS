import { LETTERS } from '@/data/letters';
import { ANIMALS } from '@/data/animals';
import { COLOURS } from '@/data/colours';
import { SHAPES } from '@/data/shapes';
import { ShapeArt } from '@/components/ShapeArt';
import type { Difficulty } from '@/data/types';
import type { ChoiceOption, ChoiceRound } from '@/sections/play/ChoiceGame';
import type { GameId } from '@/sections/play/catalog';
import { numberToWords } from '@/utils/numberWords';
import { pickMany, pickOne, randomInt, shuffle } from '@/utils/random';

type ChoiceGameId = Exclude<GameId, 'memory-match' | 'puzzle-world'>;

const OPTION_COUNT: Record<Difficulty, number> = { easy: 3, medium: 4, hard: 6 };
const NUMBER_MAX: Record<Difficulty, number> = { easy: 5, medium: 10, hard: 20 };
const SEQUENCE_STEP: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 5 };

function withOptions<T>(
  target: T,
  decoys: readonly T[],
  count: number,
  toOption: (item: T, correct: boolean) => ChoiceOption,
): ChoiceOption[] {
  const wrong = pickMany(decoys, count - 1).map((item) => toOption(item, false));
  return shuffle([toOption(target, true), ...wrong]);
}

function findLetter(difficulty: Difficulty): ChoiceRound {
  const target = pickOne(LETTERS);
  const options = withOptions(
    target,
    LETTERS.filter((letter) => letter.upper !== target.upper),
    OPTION_COUNT[difficulty],
    (letter, correct) => ({
      key: letter.upper,
      label: <span className="font-display text-5xl">{letter.upper}</span>,
      ariaLabel: `Letter ${letter.upper}`,
      correct,
    }),
  );
  return { prompt: `Find the letter ${target.upper}`, options, practise: { list: 'letters', value: target.upper } };
}

function countObjects(difficulty: Difficulty): ChoiceRound {
  const max = NUMBER_MAX[difficulty];
  const total = randomInt(1, max);
  const numbers = Array.from({ length: max }, (_, index) => index + 1);
  const options = withOptions(
    total,
    numbers.filter((value) => value !== total),
    OPTION_COUNT[difficulty],
    (value, correct) => ({
      key: String(value),
      label: <span className="font-display text-5xl">{value}</span>,
      ariaLabel: `${value}`,
      correct,
    }),
  );
  return {
    prompt: 'How many stars can you count?',
    visual: (
      <div className="flex max-w-md flex-wrap justify-center gap-2" aria-hidden>
        {Array.from({ length: total }, (_, index) => (
          <span key={index} className="text-4xl">
            {'\u{2B50}'}
          </span>
        ))}
      </div>
    ),
    options,
    practise: { list: 'numbers', value: total },
  };
}

function guessAnimal(difficulty: Difficulty): ChoiceRound {
  const target = pickOne(ANIMALS);
  const options = withOptions(
    target,
    ANIMALS.filter((animal) => animal.id !== target.id),
    OPTION_COUNT[difficulty],
    (animal, correct) => ({
      key: animal.id,
      label: <span className="text-6xl">{animal.emoji}</span>,
      ariaLabel: animal.name,
      correct,
    }),
  );
  return {
    prompt: `Which animal says "${target.sound}"?`,
    options,
    practise: { list: 'animals', value: target.id },
  };
}

function matchShapes(difficulty: Difficulty): ChoiceRound {
  const target = pickOne(SHAPES);
  const options = withOptions(
    target,
    SHAPES.filter((shape) => shape.id !== target.id),
    OPTION_COUNT[difficulty],
    (shape, correct) => ({
      key: shape.id,
      label: <ShapeArt shape={shape.id} color={shape.color} className="h-20 w-20" />,
      ariaLabel: shape.name,
      correct,
    }),
  );
  return {
    prompt: `Find the ${target.name.toLowerCase()}`,
    options,
    practise: { list: 'shapes', value: target.id },
  };
}

function colourHunt(difficulty: Difficulty): ChoiceRound {
  const target = pickOne(COLOURS);
  const targetItem = { emoji: pickOne(target.objects), colourId: target.id };
  const decoys = COLOURS.filter((colour) => colour.id !== target.id).flatMap((colour) =>
    colour.objects.map((emoji) => ({ emoji, colourId: colour.id })),
  );
  const options = withOptions(targetItem, decoys, OPTION_COUNT[difficulty], (item, correct) => ({
    key: `${item.colourId}-${item.emoji}`,
    label: <span className="text-5xl">{item.emoji}</span>,
    ariaLabel: correct ? `${target.name} object` : 'Object',
    correct,
  }));
  return {
    prompt: `Find something ${target.name.toLowerCase()}`,
    options,
    practise: { list: 'colours', value: target.id },
  };
}

function alphabetMatch(difficulty: Difficulty): ChoiceRound {
  const target = pickOne(LETTERS);
  const options = withOptions(
    target,
    LETTERS.filter((letter) => letter.upper !== target.upper),
    OPTION_COUNT[difficulty],
    (letter, correct) => ({
      key: letter.lower,
      label: <span className="font-display text-5xl">{letter.lower}</span>,
      ariaLabel: `Small letter ${letter.lower}`,
      correct,
    }),
  );
  return {
    prompt: `Find the small letter that matches ${target.upper}`,
    visual: (
      <span className="flex h-32 w-32 items-center justify-center rounded-4xl bg-sun-200 font-display text-7xl text-ink-900">
        {target.upper}
      </span>
    ),
    options,
    practise: { list: 'letters', value: target.upper },
  };
}

function numberMatch(difficulty: Difficulty): ChoiceRound {
  const max = NUMBER_MAX[difficulty];
  const target = randomInt(1, max);
  const numbers = Array.from({ length: max }, (_, index) => index + 1);
  const options = withOptions(
    target,
    numbers.filter((value) => value !== target),
    OPTION_COUNT[difficulty],
    (value, correct) => ({
      key: String(value),
      label: <span className="font-display text-5xl">{value}</span>,
      ariaLabel: `${value}`,
      correct,
    }),
  );
  return {
    prompt: `Which number is "${numberToWords(target)}"?`,
    options,
    practise: { list: 'numbers', value: target },
  };
}

function whatComesNext(difficulty: Difficulty): ChoiceRound {
  const step = SEQUENCE_STEP[difficulty];
  const start = randomInt(1, 10);
  const sequence = [0, 1, 2, 3].map((index) => start + index * step);
  const answer = start + 4 * step;
  const decoys = [-2, -1, 1, 2, 3].map((offset) => answer + offset * step).filter((value) => value > 0);
  const options = withOptions(answer, decoys, OPTION_COUNT[difficulty], (value, correct) => ({
    key: String(value),
    label: <span className="font-display text-5xl">{value}</span>,
    ariaLabel: `${value}`,
    correct,
  }));
  return {
    prompt: 'What comes next?',
    visual: (
      <div className="flex flex-wrap justify-center gap-3">
        {sequence.map((value) => (
          <span key={value} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white font-display text-2xl text-ink-900 shadow-soft">
            {value}
          </span>
        ))}
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sun-200 font-display text-2xl text-ink-900 shadow-soft">
          ?
        </span>
      </div>
    ),
    options,
  };
}

export function buildChoiceRound(gameId: ChoiceGameId, difficulty: Difficulty): ChoiceRound {
  switch (gameId) {
    case 'find-letter':
      return findLetter(difficulty);
    case 'count-objects':
      return countObjects(difficulty);
    case 'guess-animal':
      return guessAnimal(difficulty);
    case 'match-shapes':
      return matchShapes(difficulty);
    case 'colour-hunt':
      return colourHunt(difficulty);
    case 'alphabet-match':
      return alphabetMatch(difficulty);
    case 'number-match':
      return numberMatch(difficulty);
    case 'what-comes-next':
      return whatComesNext(difficulty);
  }
}
