import { motion } from 'framer-motion';
import { PageTitle } from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/Button';
import { STORIES } from '@/data/stories';
import { StoryReader } from '@/sections/stories/StoryReader';
import { useProgress } from '@/contexts/ProgressContext';
import { navigateTo } from '@/hooks/useRoute';

export function StoryWorldPage({ storyId }: { storyId?: string }) {
  const { progress } = useProgress();
  const story = STORIES.find((item) => item.id === storyId);
  const finished = new Set(progress.stories);

  if (story) {
    return (
      <div className="flex flex-col gap-8">
        <PageTitle title={story.title} />
        <StoryReader story={story} onBack={() => navigateTo('stories')} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Story World" subtitle="Pick a story and turn the pages together. Tap Read to me to hear each page." />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STORIES.map((item) => (
          <li key={item.id}>
            <motion.button
              type="button"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateTo(`stories/${item.id}`)}
              aria-label={`Read ${item.title}`}
              className={`flex w-full flex-col gap-4 rounded-4xl p-6 text-left shadow-soft transition-shadow duration-300 hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${item.coverBg}`}
            >
              <span className="text-7xl" aria-hidden>
                {item.cover}
              </span>
              <span className="font-display text-2xl leading-snug text-ink-900">{item.title}</span>
              <span className="flex items-center justify-between text-base text-ink-800">
                <span>{item.pages.length} pages</span>
                {finished.has(item.id) && <span className="font-semibold">Finished</span>}
              </span>
            </motion.button>
          </li>
        ))}
      </ul>
      <Button variant="ghost" onClick={() => navigateTo('home')}>
        Back to home
      </Button>
    </div>
  );
}
