import { SHAPES, type ShapeId } from '@/data/shapes';

const STAR_POINTS = Array.from({ length: 10 }, (_, index) => {
  const radius = index % 2 === 0 ? 44 : 20;
  const angle = -Math.PI / 2 + (index * Math.PI) / 5;
  return `${(50 + radius * Math.cos(angle)).toFixed(2)},${(54 + radius * Math.sin(angle)).toFixed(2)}`;
}).join(' ');

const HEART_PATH = 'M50 88 C10 60 4 36 20 22 C34 10 46 18 50 30 C54 18 66 10 80 22 C96 36 90 60 50 88 Z';

interface ShapeArtProps {
  shape: ShapeId;
  color: string;
  className?: string;
}

export function ShapeArt({ shape, color, className }: ShapeArtProps) {
  const fill = { fill: color };
  const art = {
    circle: <circle cx={50} cy={50} r={42} {...fill} />,
    square: <rect x={10} y={10} width={80} height={80} rx={8} {...fill} />,
    triangle: <polygon points="50,8 94,90 6,90" {...fill} />,
    rectangle: <rect x={4} y={26} width={92} height={48} rx={8} {...fill} />,
    oval: <ellipse cx={50} cy={50} rx={46} ry={30} {...fill} />,
    star: <polygon points={STAR_POINTS} {...fill} />,
    heart: <path d={HEART_PATH} {...fill} />,
    diamond: <polygon points="50,4 96,50 50,96 4,50" {...fill} />,
  };
  const label = SHAPES.find((item) => item.id === shape)?.name ?? shape;

  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={label}>
      {art[shape]}
    </svg>
  );
}
