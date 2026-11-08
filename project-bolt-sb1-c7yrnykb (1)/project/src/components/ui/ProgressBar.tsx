import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  colourClass?: string;
}

export function ProgressBar({ value, max, label, colourClass = 'bg-mint-300' }: ProgressBarProps) {
  const percent = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-base font-semibold text-ink-800">
        <span>{label}</span>
        <span>
          {value} / {max}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className="h-4 w-full overflow-hidden rounded-full bg-white shadow-soft"
      >
        <motion.div
          className={`h-full rounded-full ${colourClass}`}
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
