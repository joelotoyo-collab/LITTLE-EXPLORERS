import { AnimatePresence, motion } from 'framer-motion';
import { Check, Ear } from 'lucide-react';
import { useState } from 'react';
import { Leo } from '@/components/mascot/Leo';
import { SpeechBubble } from '@/components/mascot/SpeechBubble';
import { Button } from '@/components/ui/Button';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import { AGE_GROUPS, type AgeGroup } from '@/data/types';
import { cn } from '@/utils/classNames';

const WELCOME_LINE = 'Helloooo, little explorer! Welcome to our magical learning world!';

export function OnboardingPage() {
  const { completeOnboarding } = useProgress();
  const { speak } = useAudio();
  const [step, setStep] = useState<'welcome' | 'age'>('welcome');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('4-5');

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-8 flex items-center gap-2" aria-label={`Step ${step === 'welcome' ? 1 : 2} of 2`}>
        {(['welcome', 'age'] as const).map((id) => (
          <span
            key={id}
            className={cn('h-2.5 rounded-full transition-all duration-300', step === id ? 'w-10 bg-sky-600' : 'w-2.5 bg-ink-100')}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'welcome' ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex w-full flex-col items-center gap-6"
          >
            <Leo mood="excited" size={200} />
            <SpeechBubble className="max-w-md text-left font-display text-2xl sm:text-3xl">
              <span className="block">{WELCOME_LINE}</span>
            </SpeechBubble>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="ghost" onClick={() => speak(WELCOME_LINE)} aria-label="Hear Leo's welcome message">
                <Ear size={20} aria-hidden />
                Listen
              </Button>
              <Button size="lg" variant="sun" onClick={() => setStep('age')}>
                Let's explore!
              </Button>
            </div>
            <p className="max-w-md text-base text-ink-700">
              Little Explorers is a safe place to learn. We never ask for your name, photos or any personal details.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="age"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex w-full flex-col items-center gap-6"
          >
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Leo mood="thinking" size={130} />
              <SpeechBubble className="max-w-sm text-left">
                How old is your explorer? I will pick the perfect activities for them.
              </SpeechBubble>
            </div>

            <div role="radiogroup" aria-label="Choose an age group" className="grid w-full gap-4 sm:grid-cols-3">
              {AGE_GROUPS.map((group) => {
                const selected = group.id === ageGroup;
                return (
                  <button
                    key={group.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAgeGroup(group.id)}
                    className={cn(
                      'relative flex flex-col items-center gap-2 rounded-4xl border-4 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300',
                      selected ? 'border-sky-500 bg-sky-50' : 'border-transparent',
                    )}
                  >
                    {selected && (
                      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-mint-300 text-ink-900">
                        <Check size={18} aria-hidden />
                      </span>
                    )}
                    <span className="text-6xl" aria-hidden>
                      {group.emoji}
                    </span>
                    <span className="font-display text-2xl text-ink-900">{group.label}</span>
                    <span className="text-base text-ink-700">{group.blurb}</span>
                  </button>
                );
              })}
            </div>

            <Button size="lg" variant="sun" onClick={() => completeOnboarding(ageGroup)}>
              Start exploring!
            </Button>
            <p className="text-sm text-ink-700">A grown-up can change this any time in Parents' Corner.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
