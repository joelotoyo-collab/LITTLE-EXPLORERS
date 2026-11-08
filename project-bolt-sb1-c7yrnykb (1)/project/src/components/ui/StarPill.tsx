import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarPillProps {
  count: number;
  className?: string;
}

export function StarPill({ count, className = '' }: StarPillProps) {
  return (
    <motion.div
      key={count}
      initial={{ scale: 1.15 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      className={`flex items-center gap-2 rounded-full bg-sun-200 px-4 py-2 font-display text-lg text-ink-900 shadow-soft ${className}`}
      aria-label={`${count} stars earned`}
    >
      <Star size={20} className="fill-sun-500 text-sun-500" aria-hidden />
      <span>{count}</span>
    </motion.div>
  );
}
