import { motion } from 'framer-motion';
import { cn } from '@/utils/classNames';

interface SegmentedOption<T extends string> {
  id: T;
  label: string;
  emoji?: string;
}

interface SegmentedProps<T extends string> {
  name: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function Segmented<T extends string>({ name, options, value, onChange, className }: SegmentedProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={name}
      className={cn('flex gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-soft [scrollbar-width:none]', className)}
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.id)}
            className={cn(
              'relative flex shrink-0 touch-manipulation items-center gap-2 rounded-full px-4 py-2.5 font-display text-base transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300',
              active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-800',
            )}
          >
            {active && (
              <motion.span
                layoutId={`segmented-${name}`}
                className="absolute inset-0 rounded-full bg-sun-200"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {option.emoji && <span aria-hidden>{option.emoji}</span>}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
