import { useState } from 'react';
import { PageTitle } from '@/components/ui/PageTitle';
import { Segmented } from '@/components/ui/Segmented';
import { ColourExplore } from '@/sections/colours/ColourExplore';
import { ColourFind } from '@/sections/colours/ColourFind';

type ColourMode = 'explore' | 'find';

const MODES: { id: ColourMode; label: string; emoji: string }[] = [
  { id: 'explore', label: 'Explore', emoji: '\u{1F3A8}' },
  { id: 'find', label: 'Find it', emoji: '\u{1F50D}' },
];

export function ColourWorldPage() {
  const [mode, setMode] = useState<ColourMode>('explore');

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Colour World" subtitle="Tap a colour to hear its name, then go on a colour hunt." />
      <Segmented name="colour-mode" options={MODES} value={mode} onChange={setMode} />
      {mode === 'explore' ? <ColourExplore /> : <ColourFind />}
    </div>
  );
}
