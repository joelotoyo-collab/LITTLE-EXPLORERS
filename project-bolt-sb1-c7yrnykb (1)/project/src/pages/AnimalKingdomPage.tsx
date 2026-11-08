import { motion } from 'framer-motion';
import { Ear, Gamepad2, MapPin, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Segmented } from '@/components/ui/Segmented';
import { PageTitle } from '@/components/ui/PageTitle';
import { ANIMAL_CATEGORIES, ANIMALS, type AnimalInfo } from '@/data/animals';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { navigateTo } from '@/hooks/useRoute';
import { cn } from '@/utils/classNames';

type CategoryFilter = 'all' | (typeof ANIMAL_CATEGORIES)[number]['id'];

const FILTERS: { id: CategoryFilter; label: string; emoji: string }[] = [
  { id: 'all', label: 'All', emoji: '\u{1F30D}' },
  ...ANIMAL_CATEGORIES,
];

function AnimalDetail({ animal }: { animal: AnimalInfo }) {
  const { speak, playAnimal } = useAudio();
  const [bounceKey, setBounceKey] = useState(0);

  const makeSound = () => {
    setBounceKey((count) => count + 1);
    playAnimal(animal.id);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-4 rounded-4xl bg-mint-100 p-6">
        <motion.span
          key={bounceKey}
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -36, 0, -12, 0], rotate: [0, -8, 8, -4, 0] }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-[7rem] leading-none sm:text-[9rem]"
          aria-hidden
        >
          {animal.emoji}
        </motion.span>
        <p className="font-display text-3xl text-ink-900">{animal.name}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="sun" onClick={makeSound}>
            <Ear size={20} aria-hidden />
            Make its sound: {animal.sound}
          </Button>
          <Button variant="ghost" onClick={() => speak(animal.name)}>
            Say its name
          </Button>
        </div>
      </div>

      <div className="flex gap-3 rounded-3xl bg-sun-100 p-5">
        <Sparkles size={26} className="mt-0.5 shrink-0 text-ink-900" aria-hidden />
        <div>
          <p className="font-display text-lg text-ink-900">Did you know?</p>
          <p className="text-lg leading-relaxed text-ink-800">{animal.fact}</p>
        </div>
      </div>

      <div className="flex gap-3 rounded-3xl bg-sky-100 p-5">
        <MapPin size={26} className="mt-0.5 shrink-0 text-ink-900" aria-hidden />
        <div>
          <p className="font-display text-lg text-ink-900">Where it lives</p>
          <p className="text-lg leading-relaxed text-ink-800">{animal.habitat}</p>
        </div>
      </div>

      <Button variant="primary" onClick={() => navigateTo('play/guess-animal')}>
        <Gamepad2 size={20} aria-hidden />
        Play the guessing game
      </Button>
    </div>
  );
}

export function AnimalKingdomPage() {
  const { progress, practise } = useProgress();
  const { speak, playAnimal } = useAudio();
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [activeAnimal, setActiveAnimal] = useState<AnimalInfo | null>(null);
  const visible = filter === 'all' ? ANIMALS : ANIMALS.filter((animal) => animal.category === filter);
  const discovered = new Set(progress.animals);

  const open = (animal: AnimalInfo) => {
    setActiveAnimal(animal);
    practise('animals', animal.id);
    playAnimal(animal.id);
    window.setTimeout(() => speak(animal.name), 900);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageTitle
        title="Animal Kingdom"
        subtitle="Tap an animal to hear its sound, learn a fun fact and find out where it lives."
      />

      <div className="flex flex-col gap-6">
        <Segmented name="animal-filter" options={FILTERS} value={filter} onChange={setFilter} />
        <div className="md:w-96">
          <ProgressBar value={discovered.size} max={ANIMALS.length} label="Animals discovered" colourClass="bg-mint-300" />
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {visible.map((animal) => {
          const found = discovered.has(animal.id);
          return (
            <li key={animal.id}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => open(animal)}
                aria-label={`${animal.name}. Tap to learn more`}
                className={cn(
                  'relative flex w-full flex-col items-center gap-2 rounded-4xl bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 sm:p-5',
                )}
              >
                <span className="text-6xl sm:text-7xl" aria-hidden>
                  {animal.emoji}
                </span>
                <span className="font-display text-lg text-ink-900 sm:text-xl">{animal.name}</span>
                {found && (
                  <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-mint-300 text-ink-900">
                    <Check size={16} aria-hidden />
                  </span>
                )}
              </motion.button>
            </li>
          );
        })}
      </ul>

      <Modal open={activeAnimal !== null} title={activeAnimal?.name ?? 'Animal'} onClose={() => setActiveAnimal(null)}>
        {activeAnimal && <AnimalDetail animal={activeAnimal} />}
      </Modal>
    </div>
  );
}
