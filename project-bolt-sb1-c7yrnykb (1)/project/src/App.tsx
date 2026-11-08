import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { ProgressProvider, useProgress } from '@/contexts/ProgressContext';
import { AppShell } from '@/components/layout/AppShell';
import { MusicController } from '@/components/MusicController';
import { SplashPage } from '@/pages/SplashPage';
import { OnboardingPage } from '@/pages/OnboardingPage';

function AppGate() {
  const { progress } = useProgress();
  const [splashDone, setSplashDone] = useState(false);
  const finishSplash = useCallback(() => setSplashDone(true), []);

  if (!splashDone) return <SplashPage onComplete={finishSplash} />;
  if (!progress.onboarded) return <OnboardingPage />;
  return <AppShell />;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ProgressProvider>
        <MusicController />
        <AppGate />
      </ProgressProvider>
    </MotionConfig>
  );
}
