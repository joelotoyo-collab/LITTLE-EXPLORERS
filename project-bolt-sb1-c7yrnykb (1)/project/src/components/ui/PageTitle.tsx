import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-display text-3xl leading-tight text-ink-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-lg leading-relaxed text-ink-700">{subtitle}</p>}
      </motion.div>
      {action}
    </div>
  );
}
