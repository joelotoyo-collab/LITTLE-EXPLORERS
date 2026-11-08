import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Segmented } from '@/components/ui/Segmented';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { numberToWords } from '@/utils/numberWords';
import { cn } from '@/utils/classNames';

type RangeId = '1-10' | '11-20' | '21-50' | '51-100';

const RANGES: { id: RangeId; label: string; from: number; to: number }[] = [
  { id: '1-10', label: '1 to 10', from: 1, to: 10 },
  { id: '11-20', label: '11 to 20', from: 11, to: 20 },
  { id: '21-50', label: '21 to 50', from: 21, to: 50 },
  { id: '51-100', label: '51 to 100', from: 51, to: 100 },
];

const DISPLAY_EMOJI = ['\u{1F34E}', '\u{2B50}', '\u{1F98B}', '\u{1F41F}', '\u{1F338}', '\u{1F388}'];

function CountVisual({ value, emoji }: { value: number; emoji: string }) {
  if (value > 20) {
    return (
      <div className="flex max-w-xl flex-wrap justify-center gap-1.5" aria-label={`${value} dots`}>
        {Array.from({ length: value }, (_, index) => (
          <span key={index} className="h-3.5 w-3.5 rounded-full bg-sun-400" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex max-w-md flex-wrap justify-center gap-2" aria-label={`${value} ${emoji}`}>
      {Array.from({ length: value }, (_, index) => (
        <motion.span
          key={`${value}-${index}`}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.07, type: 'spring', stiffness: 260, damping: 14 }}
          className="text-4xl sm:text-5xl"
          aria-hidden
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}

export function NumberLearn() {
  const { progress, practise } = useProgress();
  const { speak, sfx } = useAudio();
  const [rangeId, setRangeId] = useState<RangeId>('1-10');
  const [selected, setSelected] = useState(1);
  const range = RANGES.find((item) => item.id === rangeId) ?? RANGES[0];
  const values = Array.from({ length: range.to - range.from + 1 }, (_, index) => range.from + index);
  const practised = new Set(progress.numbers);

  const choose = (value: number) => {
    setSelected(value);
    practise('numbers', value);
    sfx('pop');
    speak(numberToWords(value));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Segmented name="number-range" options={RANGES} value={rangeId} onChange={setRangeId} />
        <div className="md:w-72">
          <ProgressBar value={practised.size} max={100} label="Numbers explored" colourClass="bg-sky-300" />
        </div>
      </div>

      <section className="flex flex-col items-center gap-5 rounded-4xl bg-white p-6 shadow-card sm:p-8" aria-live="polite">
        <motion.span
          key={selected}
          initial={{ scale: 0.6, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 14 }}
          className="font-display text-[6rem] leading-none text-sky-700 sm:text-[8rem]"
        >
          {selected}
        </motion.span>
        <p className="font-display text-2xl text-ink-900">{numberToWords(selected)}</p>
        <CountVisual value={selected} emoji={DISPLAY_EMOJI[selected % DISPLAY_EMOJI.length]} />
        <Button variant="sun" onClick={() => speak(numberToWords(selected))}>
          Hear it again
        </Button>
      </section>

      <ul className="grid grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-3" aria-label={`Numbers ${range.from} to ${range.to}`}>
        {values.map((value) => (
          <li key={value}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={() => choose(value)}
              aria-label={`Number ${value}`}
              aria-pressed={value === selected}
              className={cn(
                'relative flex aspect-square w-full items-center justify-center rounded-2xl bg-white font-display text-xl text-ink-900 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 sm:text-2xl',
                value === selected && 'bg-sun-200 ring-4 ring-sun-400',
                practised.has(value) && value !== selected && 'bg-mint-100',
              )}
            >
              {value}
            </motion.button>
          </li>
        ))}
      </ul>
    </div>
  );
}
