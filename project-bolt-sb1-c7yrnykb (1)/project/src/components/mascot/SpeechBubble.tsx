import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function SpeechBubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`relative rounded-3xl bg-white px-5 py-4 text-lg font-semibold leading-relaxed text-ink-900 shadow-card ${className}`}
    >
      {children}
      <span aria-hidden className="absolute -left-2 top-6 h-4 w-4 rotate-45 bg-white" />
    </motion.div>
  );
}
