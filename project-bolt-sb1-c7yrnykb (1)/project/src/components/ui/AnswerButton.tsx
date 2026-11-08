import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/utils/classNames';

export type AnswerState = 'idle' | 'correct' | 'wrong';

interface AnswerButtonProps {
  state?: AnswerState;
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

export function AnswerButton({ state = 'idle', onClick, ariaLabel, children, className }: AnswerButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={state !== 'idle'}
      aria-label={ariaLabel}
      animate={state === 'wrong' ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
      transition={{ duration: 0.45 }}
      whileTap={state === 'idle' ? { scale: 0.92 } : undefined}
      className={cn(
        'flex min-h-[88px] touch-manipulation items-center justify-center rounded-3xl bg-white p-4 font-display text-3xl text-ink-900 shadow-soft transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 enabled:hover:-translate-y-1 enabled:hover:shadow-card disabled:cursor-default',
        state === 'correct' && 'bg-mint-200 ring-4 ring-mint-400',
        state === 'wrong' && 'bg-coral-100 opacity-60',
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
