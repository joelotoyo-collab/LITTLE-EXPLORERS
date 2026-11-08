import { motion } from 'framer-motion';

const BUBBLES = [
  { top: '8%', left: '6%', size: 'text-4xl', delay: '0s', emoji: '\u{2B50}' },
  { top: '16%', left: '86%', size: 'text-5xl', delay: '1.2s', emoji: '\u{1F308}' },
  { top: '42%', left: '3%', size: 'text-3xl', delay: '2.4s', emoji: '\u{2601}\u{FE0F}' },
  { top: '58%', left: '90%', size: 'text-4xl', delay: '0.6s', emoji: '\u{1F38A}' },
  { top: '82%', left: '12%', size: 'text-5xl', delay: '1.8s', emoji: '\u{1F34E}' },
  { top: '86%', left: '80%', size: 'text-3xl', delay: '3s', emoji: '\u{1F98B}' },
];

export function FloatingBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-sky-50 via-cream-100 to-sun-50">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
      <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-sun-200/60 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-mint-200/50 blur-3xl" />
      {BUBBLES.map((bubble) => (
        <motion.span
          key={bubble.emoji + bubble.top}
          className={`absolute select-none opacity-40 ${bubble.size}`}
          style={{ top: bubble.top, left: bubble.left }}
          animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: Number.parseFloat(bubble.delay) }}
        >
          {bubble.emoji}
        </motion.span>
      ))}
    </div>
  );
}
