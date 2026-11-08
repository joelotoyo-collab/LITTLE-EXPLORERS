import { motion, type HTMLMotionProps } from 'framer-motion';
import type { MouseEvent } from 'react';
import { useAudio } from '@/hooks/useAudio';
import { cn } from '@/utils/classNames';

type Variant = 'primary' | 'sun' | 'mint' | 'coral' | 'ghost';
type Size = 'md' | 'lg';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-sky-600 text-white shadow-[0_6px_0_0_#0E4D75] hover:bg-sky-500',
  sun: 'bg-sun-300 text-ink-900 shadow-[0_6px_0_0_#B98300] hover:bg-sun-200',
  mint: 'bg-mint-300 text-ink-900 shadow-[0_6px_0_0_#2E9C70] hover:bg-mint-200',
  coral: 'bg-coral-300 text-ink-900 shadow-[0_6px_0_0_#B94545] hover:bg-coral-200',
  ghost: 'border-2 border-ink-100 bg-white text-ink-900 shadow-soft hover:border-sky-200',
};

const SIZE_CLASSES: Record<Size, string> = {
  md: 'min-h-[52px] px-6 text-lg',
  lg: 'min-h-[64px] px-8 text-xl',
};

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'primary', size = 'md', className, children, disabled, onClick, ...rest }: ButtonProps) {
  const { sfx } = useAudio();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    sfx('tap');
    onClick?.(event);
  };
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.95, y: 4 }}
      className={cn(
        'inline-flex touch-manipulation select-none items-center justify-center gap-2 rounded-full font-display font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
