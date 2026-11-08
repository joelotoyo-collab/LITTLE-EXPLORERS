import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Leo } from '@/components/mascot/Leo';

const LOAD_MS = 3200;

export function SplashPage({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, LOAD_MS);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  const skip = onComplete;

  const title = 'LITTLE EXPLORERS'.split('');

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Start Little Explorers"
      onClick={skip}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') skip();
      }}
      className="relative flex min-h-screen cursor-pointer flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-sun-100 px-6 text-center focus:outline-none"
    >
      <motion.span aria-hidden className="absolute left-[10%] top-[14%] text-5xl" animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        {'\u{2B50}'}
      </motion.span>
      <motion.span aria-hidden className="absolute right-[12%] top-[20%] text-4xl" animate={{ y: [0, 14, 0] }} transition={{ duration: 5, repeat: Infinity }}>
        {'\u{1F308}'}
      </motion.span>
      <motion.span aria-hidden className="absolute bottom-[18%] left-[16%] text-4xl" animate={{ rotate: [0, 12, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
        {'\u{1F41D}'}
      </motion.span>
      <motion.span aria-hidden className="absolute bottom-[22%] right-[14%] text-5xl" animate={{ y: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
        {'\u{2601}\u{FE0F}'}
      </motion.span>

      <motion.div
        initial={{ x: -320, opacity: 0, rotate: -12 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 0.2 }}
      >
        <Leo mood="excited" size={200} />
      </motion.div>

      <h1 className="mt-6 font-display text-4xl leading-tight text-ink-900 sm:text-6xl">
        {title.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.05, type: 'spring', stiffness: 260, damping: 14 }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="mt-3 font-display text-xl text-ink-800 sm:text-2xl"
      >
        Little Minds. Big Discoveries.
      </motion.p>

      <div className="mt-10 h-2 w-56 overflow-hidden rounded-full bg-white/70" aria-hidden>
        <motion.div
          className="h-full rounded-full bg-sky-600"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: LOAD_MS / 1000 - 0.2, ease: 'easeInOut' }}
        />
      </div>
      <p className="mt-4 text-base font-semibold text-ink-800">Tap anywhere to start</p>
    </div>
  );
}
