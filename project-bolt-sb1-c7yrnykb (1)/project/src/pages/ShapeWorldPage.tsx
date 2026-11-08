import { useState } from 'react';
import { PageTitle } from '@/components/ui/PageTitle';
import { Segmented } from '@/components/ui/Segmented';
import { ShapeExplore } from '@/sections/shapes/ShapeExplore';
import { ShapeMatch } from '@/sections/shapes/ShapeMatch';

type ShapeMode = 'explore' | 'find';

const MODES: { id: ShapeMode; label: string; emoji: string }[] = [
  { id: 'explore', label: 'Explore', emoji: '\u{1F537}' },
  { id: 'find', label: 'Find it', emoji: '\u{1F50D}' },
];

export function ShapeWorldPage() {
  const [mode, setMode] = useState<ShapeMode>('explore');

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Shape World" subtitle="Meet every shape, find where it hides in real life, then play a spot-the-shape game." />
      <Segmented name="shape-mode" options={MODES} value={mode} onChange={setMode} />
      {mode === 'explore' ? <ShapeExplore /> : <ShapeMatch />}
    </div>
  );
}
