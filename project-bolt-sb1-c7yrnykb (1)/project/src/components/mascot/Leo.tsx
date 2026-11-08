import { motion } from 'framer-motion';

export type LeoMood = 'happy' | 'excited' | 'thinking' | 'surprised' | 'celebrating' | 'encouraging';

const INK = '#2D3A5A';
const MANE = '#E8701E';
const MANE_LIGHT = '#FFB347';
const FACE = '#FFD9A0';
const MOUTH = '#B5443A';

const TUFTS = Array.from({ length: 8 }, (_, index) => {
  const angle = (index * Math.PI) / 4;
  return { cx: 100 + Math.cos(angle) * 72, cy: 100 + Math.sin(angle) * 72 };
});

const SPARKLES: Array<{ x: number; y: number }> = [
  { x: 22, y: 36 },
  { x: 178, y: 44 },
  { x: 176, y: 168 },
];

function Eyes({ mood }: { mood: LeoMood }) {
  switch (mood) {
    case 'celebrating':
      return (
        <g fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M68 106 L80 92 L92 106" />
          <path d="M108 106 L120 92 L132 106" />
        </g>
      );
    case 'excited':
      return (
        <g>
          <circle cx={80} cy={100} r={11} fill={INK} />
          <circle cx={120} cy={100} r={11} fill={INK} />
          <circle cx={84} cy={96} r={4} fill="#FFFFFF" />
          <circle cx={124} cy={96} r={4} fill="#FFFFFF" />
        </g>
      );
    case 'thinking':
      return (
        <g>
          <path d="M68 84 Q80 78 92 86" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <circle cx={80} cy={100} r={9} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
          <circle cx={120} cy={100} r={9} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
          <circle cx={84} cy={96} r={4.5} fill={INK} />
          <circle cx={124} cy={96} r={4.5} fill={INK} />
        </g>
      );
    case 'surprised':
      return (
        <g>
          <ellipse cx={80} cy={100} rx={14} ry={16} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
          <ellipse cx={120} cy={100} rx={14} ry={16} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
          <circle cx={80} cy={102} r={6} fill={INK} />
          <circle cx={120} cy={102} r={6} fill={INK} />
        </g>
      );
    case 'encouraging':
      return (
        <g>
          <circle cx={80} cy={100} r={10} fill={INK} />
          <circle cx={84} cy={96} r={3.5} fill="#FFFFFF" />
          <path d="M110 102 Q120 110 130 102" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
        </g>
      );
    default:
      return (
        <g fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round">
          <path d="M70 104 Q80 92 90 104" />
          <path d="M110 104 Q120 92 130 104" />
        </g>
      );
  }
}

function Mouth({ mood }: { mood: LeoMood }) {
  switch (mood) {
    case 'celebrating':
      return (
        <g>
          <path d="M80 132 Q100 164 120 132 Z" fill={MOUTH} />
          <ellipse cx={100} cy={150} rx={8} ry={5} fill="#FF7A7A" />
        </g>
      );
    case 'excited':
      return <path d="M82 134 Q100 160 118 134 Z" fill={MOUTH} />;
    case 'thinking':
      return <path d="M92 142 Q100 137 108 142" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />;
    case 'surprised':
      return <ellipse cx={100} cy={144} rx={8} ry={10} fill={MOUTH} />;
    case 'encouraging':
      return <path d="M80 134 Q100 156 120 134" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
    default:
      return <path d="M84 136 Q100 150 116 136" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
  }
}

interface LeoProps {
  mood?: LeoMood;
  size?: number;
  className?: string;
}

export function Leo({ mood = 'happy', size = 160, className = '' }: LeoProps) {
  const celebrating = mood === 'celebrating';
  const sparkling = mood === 'excited' || mood === 'celebrating';

  return (
    <motion.div
      role="img"
      aria-label={`Leo the lion cub, looking ${mood}`}
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.svg
        key={mood}
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        initial={{ scale: 0.88, rotate: -3 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14 }}
        style={{ transformOrigin: '100px 100px', overflow: 'visible' }}
      >
        {TUFTS.map((tuft) => (
          <circle key={`${tuft.cx}-${tuft.cy}`} cx={tuft.cx} cy={tuft.cy} r={24} fill={MANE} />
        ))}
        <circle cx={100} cy={100} r={82} fill={MANE} />
        <circle cx={52} cy={50} r={18} fill={MANE_LIGHT} />
        <circle cx={148} cy={50} r={18} fill={MANE_LIGHT} />
        <circle cx={52} cy={52} r={9} fill={FACE} />
        <circle cx={148} cy={52} r={9} fill={FACE} />
        <circle cx={100} cy={108} r={60} fill={FACE} />
        <motion.g
          animate={{ y: celebrating ? [0, -16, 0] : 0 }}
          transition={{ duration: 0.7, repeat: celebrating ? Infinity : 0, ease: 'easeInOut' }}
        >
          <circle cx={46} cy={170} r={15} fill={MANE_LIGHT} />
        </motion.g>
        <motion.g
          animate={{ y: celebrating ? [0, -16, 0] : 0 }}
          transition={{ duration: 0.7, repeat: celebrating ? Infinity : 0, ease: 'easeInOut', delay: 0.35 }}
        >
          <circle cx={154} cy={170} r={15} fill={MANE_LIGHT} />
        </motion.g>
        <ellipse cx={100} cy={132} rx={26} ry={18} fill="#FFF1D6" />
        <path d="M92 122 Q100 116 108 122 Q104 130 100 130 Q96 130 92 122Z" fill="#6B3E2E" />
        <ellipse cx={66} cy={126} rx={9} ry={6} fill="#FF9A9A" opacity={0.75} />
        <ellipse cx={134} cy={126} rx={9} ry={6} fill="#FF9A9A" opacity={0.75} />
        <Eyes mood={mood} />
        <Mouth mood={mood} />
        {sparkling &&
          SPARKLES.map((sparkle, index) => (
            <motion.path
              key={`${sparkle.x}-${sparkle.y}`}
              d="M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z"
              transform={`translate(${sparkle.x} ${sparkle.y})`}
              fill="#FFD84D"
              animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.25 }}
              style={{ transformOrigin: `${sparkle.x}px ${sparkle.y}px` }}
            />
          ))}
      </motion.svg>
    </motion.div>
  );
}
