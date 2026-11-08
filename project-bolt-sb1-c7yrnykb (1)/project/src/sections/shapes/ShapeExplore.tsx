import { motion } from 'framer-motion';
import { Ear, Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import { ShapeArt } from '@/components/ShapeArt';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SHAPES, type ShapeInfo } from '@/data/shapes';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { navigateTo } from '@/hooks/useRoute';
import { cn } from '@/utils/classNames';

function ShapeDetail({ shape }: { shape: ShapeInfo }) {
  const { speak } = useAudio();

  return (
    <motion.section
      key={shape.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 rounded-4xl bg-white p-6 shadow-card sm:p-8"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0.6, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 15 }}
        className="h-40 w-40 sm:h-52 sm:w-52"
      >
        <ShapeArt shape={shape.id} color={shape.color} className="h-full w-full drop-shadow-md" />
      </motion.div>
      <p className="font-display text-4xl text-ink-900">{shape.name}</p>
      <p className="max-w-md text-center text-lg leading-relaxed text-ink-800">{shape.sentence}</p>
      <div className="flex flex-wrap justify-center gap-3" aria-label="Things shaped like this">
        {shape.associations.map((emoji, index) => (
          <span key={`${shape.id}-${index}`} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-100 text-3xl" aria-hidden>
            {emoji}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="sun" onClick={() => speak(`${shape.name}. ${shape.sentence}`)}>
          <Ear size={20} aria-hidden />
          Hear it
        </Button>
        <Button variant="mint" onClick={() => navigateTo('play/match-shapes')}>
          <Gamepad2 size={20} aria-hidden />
          Play matching
        </Button>
      </div>
    </motion.section>
  );
}

export function ShapeExplore() {
  const { progress, practise } = useProgress();
  const { speak } = useAudio();
  const [selectedId, setSelectedId] = useState<ShapeInfo['id']>('circle');
  const selected = SHAPES.find((shape) => shape.id === selectedId) ?? SHAPES[0];
  const discovered = new Set(progress.shapes);

  const select = (shape: ShapeInfo) => {
    setSelectedId(shape.id);
    practise('shapes', shape.id);
    speak(shape.name);
  };

  return (
    <div className="flex flex-col gap-6">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Choose a shape">
        {SHAPES.map((shape) => (
          <li key={shape.id}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => select(shape)}
              aria-pressed={shape.id === selectedId}
              aria-label={shape.name}
              className={cn(
                'relative flex w-full flex-col items-center gap-3 rounded-3xl bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300',
                shape.id === selectedId && 'ring-4 ring-sun-400',
              )}
            >
              <ShapeArt shape={shape.id} color={shape.color} className="h-16 w-16 sm:h-20 sm:w-20" />
              <span className="font-display text-lg text-ink-900">{shape.name}</span>
              {discovered.has(shape.id) && (
                <span className="absolute right-3 top-3 h-3 w-3 rounded-full bg-mint-400" aria-hidden />
              )}
            </motion.button>
          </li>
        ))}
      </ul>
      <div className="md:w-96">
        <ProgressBar value={discovered.size} max={SHAPES.length} label="Shapes met" colourClass="bg-sky-300" />
      </div>
      <ShapeDetail shape={selected} />
    </div>
  );
}
