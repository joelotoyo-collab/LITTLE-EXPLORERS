import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Confetti } from '@/components/Confetti';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import type { Difficulty } from '@/data/types';
import { shuffle } from '@/utils/random';
import { cn } from '@/utils/classNames';

const EMOJIS = [
  '\u{1F436}', '\u{1F431}', '\u{1F438}', '\u{1F981}', '\u{1F435}', '\u{1F430}',
  '\u{1F43C}', '\u{1F42F}', '\u{1F98A}', '\u{1F428}', '\u{1F437}', '\u{1F42E}',
];
const PAIRS: Record<Difficulty, number> = { easy: 4, medium: 6, hard: 8 };

interface Card {
  uid: number;
  pairId: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

function makeDeck(difficulty: Difficulty): Card[] {
  const count = PAIRS[difficulty];
  const emojis = shuffle(EMOJIS).slice(0, count);
  const cards = emojis.flatMap((emoji, pairId) => [
    { uid: pairId * 2, pairId, emoji, flipped: false, matched: false },
    { uid: pairId * 2 + 1, pairId, emoji, flipped: false, matched: false },
  ]);
  return shuffle(cards).map((card, index) => ({ ...card, uid: index }));
}

export function MemoryMatch({ difficulty }: { difficulty: Difficulty }) {
  const { addStars, recordGamePlayed } = useProgress();
  const { sfx, celebrate } = useAudio();
  const [cards, setCards] = useState<Card[]>(() => makeDeck(difficulty));
  const [moves, setMoves] = useState(0);
  const [burst, setBurst] = useState(0);
  const faceUp = cards.filter((card) => card.flipped && !card.matched);
  const done = cards.every((card) => card.matched);

  useEffect(() => {
    if (faceUp.length !== 2) return;
    const [first, second] = faceUp;
    const timer = window.setTimeout(() => {
      const isMatch = first.pairId === second.pairId;
      setCards((prev) =>
        prev.map((card) => {
          if (card.uid !== first.uid && card.uid !== second.uid) return card;
          return isMatch ? { ...card, matched: true } : { ...card, flipped: false };
        }),
      );
      if (isMatch) {
        addStars(1);
        setBurst((count) => count + 1);
        celebrate();
      } else {
        sfx('wrong');
      }
    }, 800);
    return () => window.clearTimeout(timer);
  }, [faceUp, addStars, sfx, celebrate]);

  useEffect(() => {
    if (done) {
      recordGamePlayed('memory-match');
      sfx('complete');
    }
  }, [done, recordGamePlayed, sfx]);

  const pick = (card: Card) => {
    if (card.flipped || card.matched || faceUp.length >= 2) return;
    sfx('flip');
    setMoves((value) => value + 1);
    setCards((prev) => prev.map((item) => (item.uid === card.uid ? { ...item, flipped: true } : item)));
  };

  const restart = () => {
    setCards(makeDeck(difficulty));
    setMoves(0);
  };

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden rounded-4xl bg-white p-6 shadow-card sm:p-8">
      <Confetti burstKey={burst} />
      <div className="flex flex-wrap items-center justify-between gap-3 text-base font-semibold text-ink-800">
        <span>Moves {moves}</span>
        <span>
          Pairs found {cards.filter((card) => card.matched).length / 2} of {PAIRS[difficulty]}
        </span>
      </div>
      <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-3">
        {cards.map((card) => {
          const up = card.flipped || card.matched;
          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => pick(card)}
              aria-label={up ? `Card ${card.emoji}` : 'Hidden card'}
              className="relative aspect-square w-full [perspective:800px] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 rounded-3xl"
            >
              <motion.span
                className="absolute inset-0 block"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: up ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center rounded-3xl bg-sky-200 font-display text-3xl text-ink-900 shadow-soft"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  ?
                </span>
                <span
                  className={cn(
                    'absolute inset-0 flex items-center justify-center rounded-3xl bg-white text-4xl shadow-soft sm:text-5xl',
                    card.matched && 'bg-mint-100',
                  )}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  aria-hidden
                >
                  {card.emoji}
                </span>
              </motion.span>
            </button>
          );
        })}
      </div>
      {done && (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-2xl text-ink-900">You found every pair!</p>
          <Button variant="mint" onClick={restart}>
            Play again
          </Button>
        </div>
      )}
    </div>
  );
}
