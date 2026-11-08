import type { Melody } from '@/audio/MelodyPlayer';

export type SongCategory = 'alphabet' | 'counting' | 'rhymes' | 'educational' | 'original';

export interface SongInfo {
  id: string;
  title: string;
  category: SongCategory;
  description: string;
  lyrics: string[];
  melody: Melody;
}

export const SONG_CATEGORIES: { id: SongCategory; label: string; emoji: string }[] = [
  { id: 'alphabet', label: 'Alphabet', emoji: '\u{1F524}' },
  { id: 'counting', label: 'Counting', emoji: '\u{1F522}' },
  { id: 'rhymes', label: 'Nursery Rhymes', emoji: '\u{1F9F8}' },
  { id: 'educational', label: 'Learning', emoji: '\u{1F30D}' },
  { id: 'original', label: 'Explorer Songs', emoji: '\u{1F981}' },
];

const TWINKLE_TUNE: Melody['notes'] = [
  ['C4', 1], ['C4', 1], ['G4', 1], ['G4', 1], ['A4', 1], ['A4', 1], ['G4', 2],
  ['F4', 1], ['F4', 1], ['E4', 1], ['E4', 1], ['D4', 1], ['D4', 1], ['C4', 2],
];

export const SONGS: SongInfo[] = [
  {
    id: 'alphabet-song',
    title: 'The Alphabet Song',
    category: 'alphabet',
    description: 'Sing A to Z with Leo. Listen for each letter!',
    lyrics: ['A B C D E F G', 'H I J K L M N O P', 'Q R S T U V', 'W X Y and Z', 'Now I know my ABCs!'],
    melody: {
      bpm: 110,
      notes: [
        ['C4', 0.5], ['C4', 0.5], ['G4', 0.5], ['G4', 0.5], ['A4', 0.5], ['A4', 0.5], ['G4', 1],
        ['F4', 0.5], ['F4', 0.5], ['E4', 0.5], ['E4', 0.5], ['D4', 0.5], ['D4', 0.5], ['C4', 1],
        ['G4', 0.5], ['G4', 0.5], ['F4', 0.5], ['F4', 0.5], ['E4', 0.5], ['E4', 0.5], ['D4', 1],
        ['G4', 0.5], ['G4', 0.5], ['F4', 0.5], ['F4', 0.5], ['E4', 0.5], ['E4', 0.5], ['D4', 1],
        ['C4', 0.5], ['C4', 0.5], ['G4', 0.5], ['G4', 0.5], ['A4', 0.5], ['A4', 0.5], ['G4', 1],
        ['F4', 0.5], ['F4', 0.5], ['E4', 0.5], ['E4', 0.5], ['D4', 0.5], ['D4', 0.5], ['C4', 1],
      ],
    },
  },
  {
    id: 'twinkle-counting',
    title: 'Twinkle Counting',
    category: 'counting',
    description: 'One little star, two little stars, all the way to ten.',
    lyrics: ['One little star, two little stars', 'Three little stars, four little stars', 'Five, six, seven, eight', 'Nine and ten, we count again!'],
    melody: {
      bpm: 100,
      notes: [
        ['C4', 1], ['C4', 1], ['G4', 1], ['G4', 1], ['A4', 1], ['A4', 1], ['G4', 2],
        ['F4', 1], ['F4', 1], ['E4', 1], ['E4', 1], ['D4', 1], ['D4', 1], ['C4', 2],
        ['G4', 1], ['G4', 1], ['F4', 1], ['F4', 1], ['E4', 1], ['E4', 1], ['D4', 2],
        ['G4', 1], ['G4', 1], ['F4', 1], ['F4', 1], ['E4', 1], ['E4', 1], ['D4', 2],
      ],
    },
  },
  {
    id: 'twinkle-star',
    title: 'Twinkle, Twinkle, Little Star',
    category: 'rhymes',
    description: 'A classic nursery rhyme about a sparkly night sky.',
    lyrics: ['Twinkle, twinkle, little star', 'How I wonder what you are', 'Up above the world so high', 'Like a diamond in the sky'],
    melody: { bpm: 96, notes: TWINKLE_TUNE },
  },
  {
    id: 'baa-baa-sheep',
    title: 'Baa Baa Black Sheep',
    category: 'rhymes',
    description: 'Ask the sheep about its wool, with a happy tune.',
    lyrics: ['Baa, baa, black sheep', 'Have you any wool?', 'Yes sir, yes sir', 'Three bags full!'],
    melody: {
      bpm: 100,
      notes: [
        ['C4', 1], ['C4', 1], ['G4', 1], ['G4', 1], ['A4', 1], ['A4', 1], ['G4', 2],
        ['F4', 1], ['F4', 1], ['E4', 1], ['E4', 1], ['D4', 1], ['D4', 1], ['C4', 2],
      ],
    },
  },
  {
    id: 'mary-lamb',
    title: 'Mary Had a Little Lamb',
    category: 'rhymes',
    description: 'Mary and her woolly friend walk to school together.',
    lyrics: ['Mary had a little lamb', 'Little lamb, little lamb', 'Mary had a little lamb', 'Its fleece was white as snow'],
    melody: {
      bpm: 104,
      notes: [
        ['E4', 1], ['D4', 1], ['C4', 1], ['D4', 1], ['E4', 1], ['E4', 1], ['E4', 2],
        ['D4', 1], ['D4', 1], ['D4', 2], ['E4', 1], ['G4', 1], ['G4', 2],
      ],
    },
  },
  {
    id: 'row-boat',
    title: 'Row, Row, Row Your Boat',
    category: 'rhymes',
    description: 'Paddle along the stream with your friends.',
    lyrics: ['Row, row, row your boat', 'Gently down the stream', 'Merrily, merrily, merrily, merrily', 'Life is but a dream'],
    melody: {
      bpm: 112,
      notes: [
        ['C4', 1], ['C4', 1], ['C4', 0.5], ['D4', 0.5], ['E4', 2],
        ['E4', 1], ['D4', 1], ['E4', 1], ['F4', 1], ['G4', 2],
        ['C5', 0.5], ['C5', 0.5], ['C5', 0.5], ['G4', 0.5], ['G4', 0.5], ['G4', 0.5], ['E4', 0.5], ['E4', 0.5], ['E4', 0.5], ['C4', 0.5], ['C4', 0.5], ['C4', 0.5],
        ['G4', 1], ['F4', 1], ['E4', 1], ['D4', 1], ['C4', 2],
      ],
    },
  },
  {
    id: 'rainbow-song',
    title: 'The Rainbow Scale',
    category: 'educational',
    description: 'Climb up the musical rainbow, then slide back down.',
    lyrics: ['Red, orange, yellow, green', 'Blue, purple, climb up high', 'Now slide back down the rainbow', 'Hooray, we did it!'],
    melody: {
      bpm: 120,
      notes: [
        ['C4', 1], ['D4', 1], ['E4', 1], ['F4', 1], ['G4', 1], ['A4', 1], ['B4', 1], ['C5', 2],
        ['B4', 1], ['A4', 1], ['G4', 1], ['F4', 1], ['E4', 1], ['D4', 1], ['C4', 2],
      ],
    },
  },
  {
    id: 'shape-dance',
    title: 'The Shape Dance',
    category: 'educational',
    description: 'Circles, squares and triangles all dance together.',
    lyrics: ['Circles roll and squares stand tall', 'Triangles point up to the sky', 'Shapes all dance and shapes all sing', 'Shape dance, goodbye!'],
    melody: {
      bpm: 118,
      notes: [
        ['E4', 1], ['E4', 1], ['F4', 1], ['G4', 1], ['G4', 1], ['F4', 1], ['E4', 1], ['D4', 1],
        ['C4', 1], ['C4', 1], ['D4', 1], ['E4', 1], ['E4', 1.5], ['D4', 0.5], ['D4', 2],
      ],
    },
  },
  {
    id: 'leo-hello',
    title: 'Hello, Little Explorer',
    category: 'original',
    description: 'Leo\'s very own welcome song for every explorer.',
    lyrics: ['Hello, hello, little explorer', 'Come and learn with me', 'Letters, numbers, colours too', 'Let us explore, one, two, three!'],
    melody: {
      bpm: 116,
      notes: [
        ['G4', 1], ['E4', 1], ['G4', 1], ['C5', 2], ['E5', 1], ['D5', 1], ['C5', 2],
        ['A4', 1], ['C5', 1], ['B4', 1], ['G4', 1], ['A4', 2], ['G4', 2],
      ],
    },
  },
  {
    id: 'explorer-march',
    title: 'The Explorer March',
    category: 'original',
    description: 'A bouncy marching tune for bold little adventurers.',
    lyrics: ['Left, right, step with me', 'Over hills and past the tree', 'Left, right, we are the explorers', 'Marching on as happy as can be!'],
    melody: {
      bpm: 124,
      notes: [
        ['C4', 0.5], ['E4', 0.5], ['G4', 0.5], ['E4', 0.5], ['C4', 1], ['G4', 1],
        ['A4', 0.5], ['G4', 0.5], ['F4', 0.5], ['E4', 0.5], ['D4', 1], ['G4', 1],
        ['C4', 0.5], ['E4', 0.5], ['G4', 0.5], ['C5', 0.5], ['G4', 1], ['E4', 1],
        ['C4', 2], [null, 1],
      ],
    },
  },
];
