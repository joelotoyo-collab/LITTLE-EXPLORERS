import { AnimatePresence } from 'framer-motion';
import { Leo, type LeoMood } from '@/components/mascot/Leo';
import { SpeechBubble } from '@/components/mascot/SpeechBubble';

interface LeoCoachProps {
  mood: LeoMood;
  message: string;
  leoSize?: number;
}

export function LeoCoach({ mood, message, leoSize = 110 }: LeoCoachProps) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <Leo mood={mood} size={leoSize} />
      <div className="max-w-sm sm:max-w-md">
        <AnimatePresence mode="wait">
          <SpeechBubble key={message}>{message}</SpeechBubble>
        </AnimatePresence>
      </div>
    </div>
  );
}
