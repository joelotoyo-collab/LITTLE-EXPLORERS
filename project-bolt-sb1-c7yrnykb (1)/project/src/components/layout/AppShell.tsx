import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Music, Volume2, VolumeX } from 'lucide-react';
import { useEffect } from 'react';
import { FloatingBackground } from '@/animations/FloatingBackground';
import { pageVariants } from '@/animations/variants';
import { OfflineBanner } from '@/components/OfflineBanner';
import { Leo } from '@/components/mascot/Leo';
import { StarPill } from '@/components/ui/StarPill';
import { useProgress } from '@/contexts/ProgressContext';
import { navigateTo, useRoute, type Route } from '@/hooks/useRoute';
import { AbcWorldPage } from '@/pages/AbcWorldPage';
import { AnimalKingdomPage } from '@/pages/AnimalKingdomPage';
import { ColourWorldPage } from '@/pages/ColourWorldPage';
import { HomePage } from '@/pages/HomePage';
import { MusicRhymesPage } from '@/pages/MusicRhymesPage';
import { NumberWorldPage } from '@/pages/NumberWorldPage';
import { ParentsCornerPage } from '@/pages/ParentsCornerPage';
import { PlayLearnPage } from '@/pages/PlayLearnPage';
import { RewardsPage } from '@/pages/RewardsPage';
import { ShapeWorldPage } from '@/pages/ShapeWorldPage';
import { StoryWorldPage } from '@/pages/StoryWorldPage';

function renderRoute(route: Route) {
  switch (route.name) {
    case 'abc':
      return <AbcWorldPage />;
    case 'numbers':
      return <NumberWorldPage />;
    case 'animals':
      return <AnimalKingdomPage />;
    case 'colours':
      return <ColourWorldPage />;
    case 'shapes':
      return <ShapeWorldPage />;
    case 'music':
      return <MusicRhymesPage songId={route.param} />;
    case 'stories':
      return <StoryWorldPage storyId={route.param} />;
    case 'play':
      return <PlayLearnPage gameId={route.param} />;
    case 'rewards':
      return <RewardsPage />;
    case 'parents':
      return <ParentsCornerPage />;
    default:
      return <HomePage />;
  }
}

export function AppShell() {
  const route = useRoute();
  const { progress, updateSettings } = useProgress();
  const { soundOn, musicOn } = progress.settings;
  const isHome = route.name === 'home';
  const backTarget = route.param ? route.name : 'home';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [route.name, route.param]);

  const toggleSound = () => updateSettings({ soundOn: !soundOn });
  const toggleMusic = () => updateSettings({ musicOn: !musicOn });

  return (
    <div className="relative flex min-h-screen flex-col">
      <FloatingBackground />
      <OfflineBanner />
      <header className="sticky top-0 z-40 border-b border-white/60 bg-cream-50/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {isHome ? (
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 rounded-full pr-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
              aria-label="Little Explorers home"
            >
              <Leo mood="happy" size={44} />
              <span className="font-display text-xl leading-none text-ink-900 sm:text-2xl">Little Explorers</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigateTo(backTarget)}
              className="flex min-h-[48px] items-center gap-2 rounded-full bg-white px-4 font-display text-base text-ink-900 shadow-soft transition hover:bg-sky-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              <ArrowLeft size={20} aria-hidden />
              Back
            </button>
          )}
          <div className="flex items-center gap-2">
            <StarPill count={progress.stars} />
            <button
              type="button"
              onClick={toggleMusic}
              aria-pressed={musicOn}
              aria-label={musicOn ? 'Turn background music off' : 'Turn background music on'}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-900 shadow-soft transition hover:bg-sky-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              <Music size={22} aria-hidden className={musicOn ? 'text-sky-600' : 'text-ink-900/40'} />
            </button>
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundOn}
              aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-900 shadow-soft transition hover:bg-sky-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              {soundOn ? <Volume2 size={22} aria-hidden /> : <VolumeX size={22} aria-hidden />}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${route.name}/${route.param ?? ''}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8"
          >
            {renderRoute(route)}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
