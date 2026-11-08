export const GAME_IDS = [
  'find-letter',
  'count-objects',
  'guess-animal',
  'match-shapes',
  'colour-hunt',
  'alphabet-match',
  'number-match',
  'memory-match',
  'puzzle-world',
  'what-comes-next',
] as const;

export type GameId = (typeof GAME_IDS)[number];

export interface GameMeta {
  id: GameId;
  title: string;
  emoji: string;
  blurb: string;
}

export const GAMES: GameMeta[] = [
  { id: 'find-letter', title: 'Find the Letter', emoji: '\u{1F524}', blurb: 'Listen carefully and tap the letter you hear.' },
  { id: 'count-objects', title: 'Count the Objects', emoji: '\u{2B50}', blurb: 'Count the stars and pick the right number.' },
  { id: 'guess-animal', title: 'Guess the Animal', emoji: '\u{1F989}', blurb: 'Which animal makes that sound?' },
  { id: 'match-shapes', title: 'Match the Shapes', emoji: '\u{1F537}', blurb: 'Find the shape Leo asks for.' },
  { id: 'colour-hunt', title: 'Colour Hunt', emoji: '\u{1F308}', blurb: 'Find something in the right colour.' },
  { id: 'alphabet-match', title: 'Alphabet Matching', emoji: '\u{1F3F7}\u{FE0F}', blurb: 'Match each big letter with its small friend.' },
  { id: 'number-match', title: 'Number Matching', emoji: '\u{1F522}', blurb: 'Read the number word and find its digit.' },
  { id: 'memory-match', title: 'Memory Match', emoji: '\u{1F0CF}', blurb: 'Flip two cards at a time and find the pairs.' },
  { id: 'puzzle-world', title: 'Puzzle World', emoji: '\u{1F9E9}', blurb: 'Slide the tiles back into the right order.' },
  { id: 'what-comes-next', title: 'What Comes Next?', emoji: '\u{27A1}\u{FE0F}', blurb: 'Spot the pattern and find the next number.' },
];
