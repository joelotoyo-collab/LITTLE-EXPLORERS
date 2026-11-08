import { motion } from 'framer-motion';
import { Check, Music } from 'lucide-react';
import { useState } from 'react';
import { LetterStage } from '@/sections/abc/LetterStage';
import { Button } from '@/components/ui/Button';
import { Segmented } from '@/components/ui/Segmented';
import { PageTitle } from '@/components/ui/PageTitle';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LETTERS, type LetterInfo } from '@/data/letters';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { navigateTo } from '@/hooks/useRoute';
import { cn } from '@/utils/classNames';

export type LetterMode = 'names' | 'sounds';

const MODE_OPTIONS: { id: LetterMode; label: string; emoji: string }[] = [
  { id: 'names', label: 'Letter names', emoji: '\u{1F524}' },
  { id: 'sounds', label: 'Phonics sounds', emoji: '\u{1F442}' },
];

function nameLine(letter: LetterInfo): string {
  return `${letter.upper}, ${letter.lower}. ${letter.upper} is for ${letter.word}!`;
}

export function AbcWorldPage() {
  const { progress, practise } = useProgress();
  const { speak, sfx } = useAudio();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<LetterMode>('names');
  const practised = new Set(progress.letters);

  const speakFor = (letter: LetterInfo, letterMode: LetterMode) => {
    speak(letterMode === 'names' ? nameLine(letter) : letter.phonicsHint);
  };

  const choose = (index: number) => {
    const letter = LETTERS[index];
    setActiveIndex(index);
    practise('letters', letter.upper);
    sfx('pop');
    speakFor(letter, mode);
  };

  const changeMode = (nextMode: LetterMode) => {
    setMode(nextMode);
    if (activeIndex !== null) speakFor(LETTERS[activeIndex], nextMode);
  };

  const step = (delta: number) => {
    if (activeIndex === null) return;
    const next = (activeIndex + delta + LETTERS.length) % LETTERS.length;
    choose(next);
  };

  const activeLetter = activeIndex === null ? null : LETTERS[activeIndex];

  return (
    <div className="flex flex-col gap-8">
      <PageTitle
        title="ABC World"
        subtitle="Tap a letter to meet its friend. Listen to the name, then the sound!"
        action={
          <Button variant="mint" onClick={() => navigateTo('music/alphabet-song')}>
            <Music size={20} aria-hidden />
            Sing the ABC song
          </Button>
        }
      />

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Segmented name="letter-mode" options={MODE_OPTIONS} value={mode} onChange={changeMode} className="md:w-auto" />
        <div className="md:w-72">
          <ProgressBar value={practised.size} max={LETTERS.length} label="Letters explored" colourClass="bg-sun-300" />
        </div>
      </div>

      {activeLetter ? (
        <LetterStage letter={activeLetter} mode={mode} onReplay={() => speakFor(activeLetter, mode)} onPrev={() => step(-1)} onNext={() => step(1)} />
      ) : (
        <div className="rounded-4xl border-2 border-dashed border-sky-200 bg-white/70 p-8 text-center text-lg text-ink-700">
          Tap any letter below to start your alphabet adventure.
        </div>
      )}

      <motion.ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-4 md:grid-cols-9" aria-label="Alphabet letters">
        {LETTERS.map((letter, index) => {
          const isActive = index === activeIndex;
          const isPractised = practised.has(letter.upper);
          return (
            <li key={letter.upper}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={() => choose(index)}
                aria-label={`Letter ${letter.upper}, ${letter.word}`}
                aria-pressed={isActive}
                className={cn(
                  'relative flex aspect-square w-full flex-col items-center justify-center rounded-3xl bg-white font-display shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300',
                  isActive && 'bg-sky-200 ring-4 ring-sky-400',
                )}
              >
                <span className="text-3xl leading-none text-ink-900 sm:text-4xl">{letter.upper}</span>
                <span className="text-base leading-none text-ink-700 sm:text-lg">{letter.lower}</span>
                {isPractised && (
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-mint-300 text-ink-900 shadow-soft">
                    <Check size={14} aria-hidden />
                  </span>
                )}
              </motion.button>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
