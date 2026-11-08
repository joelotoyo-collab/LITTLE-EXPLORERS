import { motion } from 'framer-motion';
import { useMemo } from 'react';

const COLOURS = ['#FFC21A', '#2AA3E6', '#FF7A7A', '#1FA876', '#FF8A3D', '#8E6BD6', '#FFD84D'];

export function Confetti({ burstKey }: { burstKey: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        x: (Math.random() - 0.5) * 320,
        y: -120 - Math.random() * 180,
        rotate: Math.random() * 720 - 360,
        colour: COLOURS[index % COLOURS.length],
        round: index % 3 === 0,
      })),
    // Regenerate the burst pattern each time a new celebration starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burstKey],
  );

  if (burstKey === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={`${burstKey}-${piece.id}`}
          className="absolute left-1/2 top-1/2 h-3 w-2.5"
          style={{ backgroundColor: piece.colour, borderRadius: piece.round ? '999px' : '3px' }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ x: piece.x, y: piece.y + 280, opacity: 0, rotate: piece.rotate, scale: 0.8 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
