import { ChoiceGame } from '@/sections/play/ChoiceGame';
import { MemoryMatch } from '@/sections/play/MemoryMatch';
import { SlidingPuzzle } from '@/sections/play/SlidingPuzzle';
import { buildChoiceRound } from '@/sections/play/choiceRounds';
import type { GameId } from '@/sections/play/catalog';
import type { Difficulty } from '@/data/types';

export function GameView({ gameId, difficulty }: { gameId: GameId; difficulty: Difficulty }) {
  if (gameId === 'memory-match') return <MemoryMatch key={difficulty} difficulty={difficulty} />;
  if (gameId === 'puzzle-world') return <SlidingPuzzle key={difficulty} difficulty={difficulty} />;
  return (
    <ChoiceGame
      key={`${gameId}-${difficulty}`}
      gameId={gameId}
      difficulty={difficulty}
      build={(level) => buildChoiceRound(gameId, level)}
    />
  );
}
