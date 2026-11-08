import { Mic, Music, Sparkles, Volume2, VolumeX, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useProgress } from '@/contexts/ProgressContext';

interface ToggleButtonProps {
  icon: LucideIcon;
  label: string;
  on: boolean;
  onToggle: () => void;
}

function ToggleButton({ icon: Icon, label, on, onToggle }: ToggleButtonProps) {
  return (
    <Button variant={on ? 'mint' : 'ghost'} onClick={onToggle} aria-pressed={on}>
      <Icon size={20} aria-hidden />
      {label}: {on ? 'on' : 'off'}
    </Button>
  );
}

interface VolumeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function VolumeSlider({ label, value, onChange }: VolumeSliderProps) {
  return (
    <label className="flex flex-col gap-2 text-base text-ink-800">
      <span className="flex items-center justify-between">
        <span>{label}</span>
        <span className="font-display text-ink-900">{Math.round(value * 100)}%</span>
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full cursor-pointer accent-sky-600"
      />
    </label>
  );
}

export function AudioSettings() {
  const { progress, updateSettings } = useProgress();
  const { soundOn, musicOn, musicVolume, narrationOn, sfxOn, volume } = progress.settings;

  return (
    <section className="flex flex-col gap-6 rounded-4xl bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl text-ink-900">Audio</h2>
        <p className="text-base leading-relaxed text-ink-700">Music, Leo's voice and sound effects. Your choices are saved on this device.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ToggleButton icon={soundOn ? Volume2 : VolumeX} label="Master sound" on={soundOn} onToggle={() => updateSettings({ soundOn: !soundOn })} />
        <ToggleButton icon={Music} label="Background music" on={musicOn} onToggle={() => updateSettings({ musicOn: !musicOn })} />
        <ToggleButton icon={Mic} label="Leo's voice" on={narrationOn} onToggle={() => updateSettings({ narrationOn: !narrationOn })} />
        <ToggleButton icon={Sparkles} label="Sound effects" on={sfxOn} onToggle={() => updateSettings({ sfxOn: !sfxOn })} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <VolumeSlider label="Music volume" value={musicVolume} onChange={(next) => updateSettings({ musicVolume: next })} />
        <VolumeSlider label="Voice and sound effects volume" value={volume} onChange={(next) => updateSettings({ volume: next })} />
      </div>
    </section>
  );
}
