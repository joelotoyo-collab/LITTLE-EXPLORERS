import { motion } from 'framer-motion';
import { Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { MelodyPlayer } from '@/audio/MelodyPlayer';
import { Button } from '@/components/ui/Button';
import { useAudio } from '@/hooks/useAudio';
import { useProgress } from '@/contexts/ProgressContext';
import type { SongInfo } from '@/data/songs';
import { cn } from '@/utils/classNames';

interface SongPlayerProps {
  song: SongInfo;
  onPrevious: () => void;
  onNext: () => void;
}

export function SongPlayer({ song, onPrevious, onNext }: SongPlayerProps) {
  const { practise, updateSettings } = useProgress();
  const { soundOn, volume } = useAudio();
  const player = useMemo(() => new MelodyPlayer(song.melody), [song]);
  const [playing, setPlaying] = useState(false);
  const [fraction, setFraction] = useState(0);

  useEffect(() => {
    player.onEnd = () => {
      setPlaying(false);
      setFraction(0);
    };
    return () => player.stop();
  }, [player]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      setFraction(Math.min(1, player.position() / player.totalSeconds));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, player]);

  const togglePlay = () => {
    if (!soundOn) return;
    if (player.isPlaying) {
      player.pause();
      setPlaying(false);
      return;
    }
    player.play(player.position(), volume);
    practise('songs', song.id);
    setPlaying(true);
  };

  const replay = () => {
    if (!soundOn) return;
    player.stop();
    player.play(0, volume);
    practise('songs', song.id);
    setFraction(0);
    setPlaying(true);
  };

  const seek = (value: number) => {
    const seconds = value * player.totalSeconds;
    setFraction(value);
    if (!soundOn) return;
    player.play(seconds, volume);
    if (!playing) player.pause();
  };

  const changeVolume = (value: number) => {
    updateSettings({ volume: value });
    player.setVolume(value);
  };

  const activeLine = Math.min(song.lyrics.length - 1, Math.floor(fraction * song.lyrics.length));

  return (
    <section className="flex flex-col gap-6 rounded-4xl bg-white p-6 shadow-card sm:p-8" aria-label={`Now playing ${song.title}`}>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Now playing</p>
        <h2 className="mt-1 font-display text-3xl text-ink-900">{song.title}</h2>
        <p className="mt-2 text-lg leading-relaxed text-ink-700">{song.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={fraction}
          onChange={(event) => seek(Number(event.target.value))}
          aria-label="Song position"
          className="h-3 w-full cursor-pointer accent-sky-600"
        />
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream-200" aria-hidden>
          <motion.div className="h-full rounded-full bg-sun-400" style={{ width: `${fraction * 100}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="ghost" onClick={onPrevious} aria-label="Previous song" size="md">
          <SkipBack size={22} aria-hidden />
        </Button>
        <Button variant="primary" size="lg" onClick={togglePlay} disabled={!soundOn} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <Pause size={26} aria-hidden /> : <Play size={26} aria-hidden />}
          {playing ? 'Pause' : 'Play'}
        </Button>
        <Button variant="ghost" onClick={replay} disabled={!soundOn} aria-label="Replay song">
          <RotateCcw size={22} aria-hidden />
        </Button>
        <Button variant="ghost" onClick={onNext} aria-label="Next song">
          <SkipForward size={22} aria-hidden />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {volume === 0 ? <VolumeX size={22} className="text-ink-700" aria-hidden /> : <Volume2 size={22} className="text-ink-700" aria-hidden />}
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(event) => changeVolume(Number(event.target.value))}
          aria-label="Volume"
          className="w-full cursor-pointer accent-sky-600"
        />
      </div>

      {!soundOn && (
        <p className="rounded-2xl bg-sun-100 p-4 text-center text-base text-ink-800">
          Sound is switched off. Turn it on with the speaker button at the top of the screen to listen.
        </p>
      )}

      <ol className="flex flex-col gap-2 rounded-3xl bg-cream-50 p-5" aria-label="Lyrics">
        {song.lyrics.map((line, index) => (
          <li
            key={line}
            className={cn(
              'font-display text-xl text-ink-700 transition duration-300',
              playing && index === activeLine && 'scale-[1.02] text-sky-700',
            )}
          >
            {line}
          </li>
        ))}
      </ol>
    </section>
  );
}
