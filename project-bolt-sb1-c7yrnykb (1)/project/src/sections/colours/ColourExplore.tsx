import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Ear } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { COLOURS, type ColourInfo } from '@/data/colours';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { cn } from '@/utils/classNames';

function ColourStage({ colour, onPrevious, onNext }: { colour: ColourInfo; onPrevious: () => void; onNext: () => void }) {
  const { speak } = useAudio();

  return (
    <motion.section
      key={colour.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 rounded-4xl bg-white p-6 shadow-card sm:p-8"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        className={cn('h-40 w-40 rounded-full shadow-card sm:h-56 sm:w-56', colour.id === 'white' && 'border-4 border-ink-100')}
        style={{ backgroundColor: colour.hex }}
        aria-hidden
      />
      <p className="font-display text-4xl text-ink-900">{colour.name}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {colour.objects.map((emoji, index) => (
          <motion.span
            key={`${colour.id}-${index}`}
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 14 }}
            className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cream-100 text-4xl sm:h-24 sm:w-24 sm:text-5xl"
            aria-hidden
          >
            {emoji}
          </motion.span>
        ))}
      </div>
      <Button variant="sun" onClick={() => speak(`${colour.name}! Can you find something ${colour.name.toLowerCase()}?`)}>
        <Ear size={20} aria-hidden />
        Hear it
      </Button>
      <div className="flex w-full items-center justify-between gap-3">
        <Button variant="ghost" onClick={onPrevious} aria-label="Previous colour">
          <ChevronLeft size={20} aria-hidden />
          Previous
        </Button>
        <Button variant="ghost" onClick={onNext} aria-label="Next colour">
          Next
          <ChevronRight size={20} aria-hidden />
        </Button>
      </div>
    </motion.section>
  );
}

export function ColourExplore() {
  const { progress, practise } = useProgress();
  const { speak } = useAudio();
  const [index, setIndex] = useState(0);
  const colour = COLOURS[index];
  const discovered = new Set(progress.colours);

  const select = (nextIndex: number) => {
    setIndex(nextIndex);
    practise('colours', COLOURS[nextIndex].id);
    speak(COLOURS[nextIndex].name);
  };

  return (
    <div className="flex flex-col gap-6">
      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-11" aria-label="Choose a colour">
        {COLOURS.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => select(itemIndex)}
              aria-label={item.name}
              aria-pressed={itemIndex === index}
              className={cn(
                'relative aspect-square w-full rounded-full shadow-soft transition duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300',
                item.id === 'white' && 'border-2 border-ink-100',
                itemIndex === index && 'ring-4 ring-sun-400 ring-offset-2 ring-offset-cream-100',
              )}
              style={{ backgroundColor: item.hex }}
            >
              {discovered.has(item.id) && (
                <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-mint-400 ring-2 ring-white" aria-hidden />
              )}
            </button>
          </li>
        ))}
      </ul>
      <div className="md:w-96">
        <ProgressBar value={discovered.size} max={COLOURS.length} label="Colours found" colourClass="bg-coral-300" />
      </div>
      <ColourStage
        colour={colour}
        onPrevious={() => select((index - 1 + COLOURS.length) % COLOURS.length)}
        onNext={() => select((index + 1) % COLOURS.length)}
      />
    </div>
  );
}
