import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { staggerContainer, staggerItem } from '@/animations/variants';
import { Leo, type LeoMood } from '@/components/mascot/Leo';
import { SpeechBubble } from '@/components/mascot/SpeechBubble';
import { navigateTo, type RouteName } from '@/hooks/useRoute';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { AGE_GROUPS } from '@/data/types';
import { pickOne } from '@/utils/random';

interface World {
  route: RouteName;
  title: string;
  subtitle: string;
  emoji: string;
  tint: string;
}

export const WORLDS: World[] = [
  { route: 'abc', title: 'ABC World', subtitle: 'Letters, sounds and first words', emoji: '\u{1F524}', tint: 'bg-sky-200' },
  { route: 'numbers', title: 'Number World', subtitle: 'Count, match and add', emoji: '\u{1F522}', tint: 'bg-sun-200' },
  { route: 'animals', title: 'Animal Kingdom', subtitle: 'Sounds, facts and friends', emoji: '\u{1F981}', tint: 'bg-mint-200' },
  { route: 'colours', title: 'Colour World', subtitle: 'Find every colour', emoji: '\u{1F3A8}', tint: 'bg-coral-200' },
  { route: 'shapes', title: 'Shape World', subtitle: 'Circles, stars and more', emoji: '\u{1F537}', tint: 'bg-lilac-200' },
  { route: 'music', title: 'Music & Rhymes', subtitle: 'Sing along with Leo', emoji: '\u{1F3B5}', tint: 'bg-tangerine-200' },
  { route: 'stories', title: 'Story World', subtitle: 'Little stories with big hearts', emoji: '\u{1F4D6}', tint: 'bg-sky-100' },
  { route: 'play', title: 'Play & Learn', subtitle: '10 mini-games to try', emoji: '\u{1F3AE}', tint: 'bg-sun-100' },
  { route: 'rewards', title: 'My Rewards', subtitle: 'Stars, badges and stickers', emoji: '\u{1F3C6}', tint: 'bg-mint-100' },
];

const LEO_LINES = [
  'Hooray, you found me! Pick a world to explore.',
  'Every question is a great question, explorer!',
  'Let us learn something brand new today!',
  'You are doing amazing, keep going!',
];

const LEO_MOODS: LeoMood[] = ['excited', 'happy', 'celebrating', 'encouraging'];

export function HomePage() {
  const { progress } = useProgress();
  const { speak, sfx } = useAudio();
  const [leoMood, setLeoMood] = useState<LeoMood>('happy');
  const [leoLine, setLeoLine] = useState<string | null>(null);
  const ageLabel = AGE_GROUPS.find((group) => group.id === progress.ageGroup)?.label ?? '';

  const tapLeo = () => {
    const line = pickOne(LEO_LINES);
    setLeoMood(pickOne(LEO_MOODS));
    setLeoLine(line);
    sfx('pop');
    speak(line);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
        <motion.button
          type="button"
          onClick={tapLeo}
          whileTap={{ scale: 0.92 }}
          aria-label="Tap Leo for a surprise"
          className="shrink-0 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
        >
          <Leo mood={leoMood} size={180} />
        </motion.button>
        <div className="flex max-w-xl flex-col gap-4 text-center md:text-left">
          <span className="inline-flex w-fit self-center rounded-full bg-white px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-sky-700 shadow-soft md:self-start">
            {ageLabel} mode
          </span>
          <h1 className="font-display text-4xl leading-tight text-ink-900 sm:text-5xl">Hello, Little Explorer!</h1>
          <SpeechBubble className="self-center md:self-start">
            {leoLine ?? 'Pick a world below to start your adventure. Tap me for a surprise!'}
          </SpeechBubble>
        </div>
      </section>

      <motion.ul
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
      >
        {WORLDS.map((world) => (
          <motion.li key={world.route} variants={staggerItem}>
            <button
              type="button"
              onClick={() => navigateTo(world.route)}
              className={`group flex h-full min-h-[172px] w-full flex-col items-start justify-between gap-4 rounded-4xl p-5 text-left shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-pop focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 active:scale-[0.97] sm:p-6 ${world.tint}`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/80 text-4xl shadow-soft transition duration-300 group-hover:rotate-6 group-hover:scale-110" aria-hidden>
                {world.emoji}
              </span>
              <span>
                <span className="block font-display text-xl leading-tight text-ink-900 sm:text-2xl">{world.title}</span>
                <span className="mt-1 block text-base leading-snug text-ink-800">{world.subtitle}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => navigateTo('parents')}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-5 font-semibold text-ink-700 transition hover:bg-white hover:text-ink-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
        >
          <Lock size={18} aria-hidden />
          Parents' Corner
        </button>
      </div>
    </div>
  );
}
