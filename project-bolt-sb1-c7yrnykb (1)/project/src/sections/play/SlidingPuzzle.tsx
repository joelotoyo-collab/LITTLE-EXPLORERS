import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Confetti } from '@/components/Confetti';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import type { Difficulty } from '@/data/types';
import { shuffle } from '@/utils/random';
import { cn } from '@/utils/classNames';

const TILE_EMOJIS = [
  '\u{1F34E}', '\u{1F34C}', '\u{1F353}', '\u{1F347}', '\u{1F34A}', '\u{1F352}', '\u{1F34D}', '\u{1F95D}',
];
const SIZE: Record<Difficulty, number> = { easy: 2, medium: 3, hard: 3 };
const SHUFFLE_MOVES: Record<Difficulty, number> = { easy: 12, medium: 60, hard: 120 };

function solvedTiles(size: number): number[] {
  return Array.from({ length: size * size }, (_, index) => (index === size * size - 1 ? 0 : index + 1));
}

function isSolved(tiles: number[]): boolean {
  return tiles.every((value, index) => value === (index === tiles.length - 1 ? 0 : index + 1));
}

function isAdjacent(a: number, b: number, size: number): boolean {
  return Math.abs(Math.floor(a / size) - Math.floor(b / size)) + Math.abs((a % size) - (b % size)) === 1;
}

function scramble(size: number, moves: number): number[] {
  const tiles = solvedTiles(size);
  let blank = tiles.length - 1;
  let previous = -1;
  for (let step = 0; step < moves; step += 1) {
    const row = Math.floor(blank / size);
    const col = blank % size;
    const neighbours = [
      row > 0 ? blank - size : -1,
      row < size - 1 ? blank + size : -1,
      col > 0 ? blank - 1 : -1,
      col < size - 1 ? blank + 1 : -1,
    ].filter((index) => index >= 0 && index !== previous);
    const next = shuffle(neighbours)[0];
    [tiles[blank], tiles[next]] = [tiles[next], tiles[blank]];
    previous = blank;
    blank = next;
  }
  return isSolved(tiles) ? scramble(size, moves) : tiles;
}

export function SlidingPuzzle({ difficulty }: { difficulty: Difficulty }) {
  const { addStars, recordGamePlayed } = useProgress();
  const { sfx } = useAudio();
  const size = SIZE[difficulty];
  const [tiles, setTiles] = useState<number[]>(() => scramble(size, SHUFFLE_MOVES[difficulty]));
  const [moves, setMoves] = useState(0);
  const [burst, setBurst] = useState(0);
  const won = isSolved(tiles) && moves > 0;

  const slide = (index: number) => {
    if (won) return;
    const blank = tiles.indexOf(0);
    if (!isAdjacent(index, blank, size)) return;
    const next = [...tiles];
    [next[index], next[blank]] = [next[blank], next[index]];
    setTiles(next);
    setMoves((value) => value + 1);
    sfx('tap');
    if (isSolved(next)) {
      addStars(3);
      setBurst((count) => count + 1);
      sfx('celebrate');
      recordGamePlayed('puzzle-world');
    }
  };

  const restart = () => {
    setTiles(scramble(size, SHUFFLE_MOVES[difficulty]));
    setMoves(0);
  };

  return (
    <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-4xl bg-white p-6 shadow-card sm:p-8">
      <Confetti burstKey={burst} />
      <p className="text-base font-semibold text-ink-800">Moves {moves}</p>
      <div
        className="grid aspect-square w-full max-w-sm gap-2 rounded-3xl bg-cream-100 p-2"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {tiles.map((value, index) => (
          <motion.button
            key={value === 0 ? 'blank' : value}
            layout
            type="button"
            onClick={() => slide(index)}
            disabled={value === 0}
            aria-label={value === 0 ? 'Empty space' : `Tile ${value}`}
            className={cn(
              'flex items-center justify-center rounded-2xl font-display text-4xl shadow-soft transition focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 sm:text-5xl',
              value === 0 ? 'bg-transparent' : 'bg-sky-200 text-ink-900 hover:bg-sky-100',
            )}
          >
            {value !== 0 && <span aria-hidden>{TILE_EMOJIS[value - 1]}</span>}
          </motion.button>
        ))}
      </div>
      {won ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-2xl text-ink-900">Puzzle complete in {moves} moves!</p>
          <Button variant="mint" onClick={restart}>
            Shuffle again
          </Button>
        </div>
      ) : (
        <p className="text-center text-lg text-ink-700">Tap a tile next to the empty space to slide it.</p>
      )}
    </div>
  );
}
