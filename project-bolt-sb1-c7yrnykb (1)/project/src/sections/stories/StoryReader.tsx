import { motion } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import type { StoryInfo } from '@/data/stories';

interface StoryReaderProps {
  story: StoryInfo;
  onBack: () => void;
}

export function StoryReader({ story, onBack }: StoryReaderProps) {
  const { practise, addStars } = useProgress();
  const { speak, sfx } = useAudio();
  const [pageIndex, setPageIndex] = useState(0);
  const page = story.pages[pageIndex];
  const isLast = pageIndex === story.pages.length - 1;

  useEffect(() => {
    speak(story.pages[pageIndex].text);
  }, [story, pageIndex, speak]);

  const finish = () => {
    practise('stories', story.id);
    addStars(2);
    sfx('complete');
    setPageIndex(story.pages.length - 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft size={20} aria-hidden />
          All stories
        </Button>
        <p className="font-display text-lg text-ink-900">
          Page {pageIndex + 1} of {story.pages.length}
        </p>
      </div>

      <motion.section
        key={pageIndex}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className={`flex min-h-[320px] flex-col items-center justify-center gap-6 rounded-4xl p-6 text-center shadow-card sm:p-10 ${page.scene}`}
        aria-live="polite"
      >
        <motion.span
          initial={{ scale: 0.6, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 14 }}
          className="text-7xl sm:text-8xl"
          aria-hidden
        >
          {page.emoji}
        </motion.span>
        <p className="max-w-xl font-display text-2xl leading-snug text-ink-900 sm:text-3xl">{page.text}</p>
      </motion.section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => setPageIndex((index) => Math.max(0, index - 1))} disabled={pageIndex === 0}>
          <ChevronLeft size={20} aria-hidden />
          Previous
        </Button>
        <Button variant="sun" onClick={() => speak(page.text)}>
          <Volume2 size={20} aria-hidden />
          Read to me
        </Button>
        {isLast ? (
          <Button variant="mint" onClick={finish}>
            <BookOpen size={20} aria-hidden />
            Finish story
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setPageIndex((index) => index + 1)}>
            Next
            <ChevronRight size={20} aria-hidden />
          </Button>
        )}
      </div>

      {isLast && (
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white p-5 text-center shadow-soft">
          <p className="font-display text-xl text-ink-900">The End. Well read, explorer!</p>
          <Button variant="ghost" onClick={() => setPageIndex(0)}>
            <RotateCcw size={20} aria-hidden />
            Read it again
          </Button>
        </div>
      )}
    </div>
  );
}
