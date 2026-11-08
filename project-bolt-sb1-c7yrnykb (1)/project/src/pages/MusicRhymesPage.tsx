import { useMemo } from 'react';
import { PageTitle } from '@/components/ui/PageTitle';
import { SONG_CATEGORIES, SONGS } from '@/data/songs';
import { SongPlayer } from '@/sections/music/SongPlayer';
import { navigateTo } from '@/hooks/useRoute';
import { cn } from '@/utils/classNames';

export function MusicRhymesPage({ songId }: { songId?: string }) {
  const currentIndex = Math.max(0, SONGS.findIndex((song) => song.id === songId));
  const current = SONGS[currentIndex];
  const total = SONGS.length;
  const groups = useMemo(
    () =>
      SONG_CATEGORIES.map((category) => ({
        category,
        songs: SONGS.filter((song) => song.category === category.id),
      })).filter((group) => group.songs.length > 0),
    [],
  );

  const goTo = (index: number) => navigateTo(`music/${SONGS[(index + total) % total].id}`);

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Music & Rhymes" subtitle="Sing along with Leo. Tap a song, then press play and follow the words." />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
        <nav className="flex flex-col gap-6 rounded-4xl bg-white p-6 shadow-soft" aria-label="Song list">
          {groups.map(({ category, songs }) => (
            <div key={category.id} className="flex flex-col gap-3">
              <p className="font-display text-lg text-ink-900">
                <span aria-hidden>{category.emoji} </span>
                {category.label}
              </p>
              <ul className="flex flex-col gap-2">
                {songs.map((song) => {
                  const active = song.id === current.id;
                  return (
                    <li key={song.id}>
                      <button
                        type="button"
                        onClick={() => navigateTo(`music/${song.id}`)}
                        aria-current={active ? 'true' : undefined}
                        className={cn(
                          'flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left font-semibold text-ink-900 transition duration-200 hover:bg-sky-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300',
                          active ? 'bg-sun-200' : 'bg-cream-50',
                        )}
                      >
                        <span>{song.title}</span>
                        {active && <span className="text-sm text-ink-800">Playing</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <SongPlayer
          key={current.id}
          song={current}
          onPrevious={() => goTo(currentIndex - 1)}
          onNext={() => goTo(currentIndex + 1)}
        />
      </div>
    </div>
  );
}
