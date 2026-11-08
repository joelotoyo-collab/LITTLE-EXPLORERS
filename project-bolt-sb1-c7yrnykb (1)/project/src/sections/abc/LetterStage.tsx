import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import type { LetterInfo } from '@/data/letters';
import { Button } from '@/components/ui/Button';
import type { LetterMode } from '@/pages/AbcWorldPage';

interface LetterStageProps {
  letter: LetterInfo;
  mode: LetterMode;
  onReplay: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LetterStage({ letter, mode, onReplay, onPrev, onNext }: LetterStageProps) {
  const caption = mode === 'names' ? `${letter.upper} is for ${letter.word}` : letter.phonicsHint;

  return (
    <motion.section
      key={letter.upper}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      aria-live="polite"
      className="grid gap-6 rounded-4xl bg-white p-5 shadow-card sm:p-8 md:grid-cols-2"
    >
      <div className="flex flex-col items-center justify-center gap-5 rounded-3xl bg-sky-100 p-6">
        <motion.div
          key={`letters-${letter.upper}`}
          initial={{ rotate: -8, scale: 0.7 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          className="flex items-end gap-4"
        >
          <span className="font-display text-[7.5rem] leading-none text-sky-700 sm:text-[9.5rem]">{letter.upper}</span>
          <span className="font-display text-[4.5rem] leading-none text-sky-600 sm:text-[6rem]">{letter.lower}</span>
        </motion.div>
        <p className="text-center font-display text-2xl text-ink-900">{caption}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <motion.span
          key={`emoji-${letter.upper}`}
          initial={{ scale: 0.3, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 12 }}
          className="text-[6.5rem] leading-none"
          aria-hidden
        >
          {letter.emoji}
        </motion.span>
        <p className="font-display text-3xl text-ink-900">{letter.word}</p>
        <p className="text-lg text-ink-700">
          Sound: <span className="font-bold text-ink-900">"{letter.sound}"</span>
        </p>
        <Button variant="sun" onClick={onReplay}>
          <Volume2 size={22} aria-hidden />
          Hear again
        </Button>
        <div className="mt-2 flex w-full items-center justify-between gap-3">
          <Button variant="ghost" onClick={onPrev} aria-label="Previous letter">
            <ChevronLeft size={22} aria-hidden />
            Previous
          </Button>
          <Button variant="ghost" onClick={onNext} aria-label="Next letter">
            Next
            <ChevronRight size={22} aria-hidden />
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
