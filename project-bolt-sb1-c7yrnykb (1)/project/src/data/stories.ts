export type StoryTheme = 'friendship' | 'kindness' | 'sharing' | 'animals' | 'colours' | 'numbers' | 'manners' | 'curiosity' | 'nature';

export interface StoryPage {
  text: string;
  emoji: string;
  scene: string;
}

export interface StoryInfo {
  id: string;
  title: string;
  theme: StoryTheme;
  cover: string;
  coverBg: string;
  pages: StoryPage[];
}

export const STORIES: StoryInfo[] = [
  {
    id: 'benny-shares',
    title: 'Benny Learns to Share',
    theme: 'sharing',
    cover: '\u{1F430}',
    coverBg: 'bg-sun-200',
    pages: [
      { text: 'Benny the bunny found six juicy carrots in the garden.', emoji: '\u{1F955}', scene: 'bg-sun-100' },
      { text: 'His friend Dolly the duck came by. She looked very hungry.', emoji: '\u{1F986}', scene: 'bg-sky-100' },
      { text: 'Benny thought for a moment. Then he split the carrots into two piles.', emoji: '\u{1F955}\u{1F955}', scene: 'bg-mint-100' },
      { text: 'Dolly smiled and said, "Thank you, Benny!" They ate together in the sunshine.', emoji: '\u{1F31E}', scene: 'bg-sun-100' },
    ],
  },
  {
    id: 'kind-cloud',
    title: 'The Kind Little Cloud',
    theme: 'kindness',
    cover: '\u{2601}\u{FE0F}',
    coverBg: 'bg-sky-200',
    pages: [
      { text: 'A little cloud floated over a dry, dusty field.', emoji: '\u{2601}\u{FE0F}', scene: 'bg-sky-100' },
      { text: 'The flowers drooped their heads. "We are so thirsty," they whispered.', emoji: '\u{1F940}', scene: 'bg-cream-200' },
      { text: 'The cloud gave a gentle sigh and let go of its raindrops, one, two, three.', emoji: '\u{1F327}\u{FE0F}', scene: 'bg-sky-200' },
      { text: 'Soon the flowers stood tall and bright again. The cloud felt happy too.', emoji: '\u{1F33B}', scene: 'bg-mint-100' },
    ],
  },
  {
    id: 'ollie-counts',
    title: 'Ollie Counts the Stars',
    theme: 'numbers',
    cover: '\u{2B50}',
    coverBg: 'bg-lilac-100',
    pages: [
      { text: 'Ollie the owl wanted to count the stars before bedtime.', emoji: '\u{1F989}', scene: 'bg-sky-200' },
      { text: 'One star, two stars, three stars. Ollie counted slowly and carefully.', emoji: '\u{2B50}\u{2B50}\u{2B50}', scene: 'bg-lilac-100' },
      { text: 'Four, five, six. Some stars were so tiny that Ollie had to squint!', emoji: '\u{1F31F}', scene: 'bg-sky-200' },
      { text: 'Seven, eight, nine, ten! "Ten stars for a perfect night," said Ollie. Goodnight!', emoji: '\u{1F319}', scene: 'bg-lilac-100' },
    ],
  },
  {
    id: 'rainbow-paintbrush',
    title: 'The Rainbow Paintbrush',
    theme: 'colours',
    cover: '\u{1F58C}\u{FE0F}',
    coverBg: 'bg-coral-100',
    pages: [
      { text: 'Pip the parrot found a magic paintbrush behind the old barn.', emoji: '\u{1F99C}', scene: 'bg-cream-200' },
      { text: 'She painted the sky bright blue and the sun a sunny yellow.', emoji: '\u{2600}\u{FE0F}', scene: 'bg-sky-100' },
      { text: 'She painted a red apple, a green frog and an orange fox.', emoji: '\u{1F34E}', scene: 'bg-mint-100' },
      { text: 'Then Pip painted a big rainbow across the whole sky. What a masterpiece!', emoji: '\u{1F308}', scene: 'bg-coral-100' },
    ],
  },
  {
    id: 'mimi-kitten',
    title: 'Mimi and the Lost Kitten',
    theme: 'friendship',
    cover: '\u{1F431}',
    coverBg: 'bg-tangerine-100',
    pages: [
      { text: 'Mimi the mouse heard a tiny meow near the big oak tree.', emoji: '\u{1F42D}', scene: 'bg-mint-100' },
      { text: 'A little kitten was lost and very scared. Mimi did not run away.', emoji: '\u{1F63F}', scene: 'bg-tangerine-100' },
      { text: 'Mimi asked her friends to help. Together they followed the kitten\'s footprints.', emoji: '\u{1F43E}', scene: 'bg-sun-100' },
      { text: 'They found the kitten\'s mummy waiting by the gate. Friends help each other!', emoji: '\u{1F49B}', scene: 'bg-coral-100' },
    ],
  },
  {
    id: 'good-morning-manners',
    title: 'Good Morning, Good Manners',
    theme: 'manners',
    cover: '\u{1F44B}',
    coverBg: 'bg-mint-200',
    pages: [
      { text: 'Every morning, Gus the giraffe said hello to everyone he met.', emoji: '\u{1F992}', scene: 'bg-mint-100' },
      { text: '"Good morning, Mrs Hen!" Gus said with a big smile.', emoji: '\u{1F414}', scene: 'bg-sun-100' },
      { text: 'When he wanted a snack, he said, "Please," and when he got one, "Thank you!"', emoji: '\u{1F34E}', scene: 'bg-cream-200' },
      { text: 'Everyone loved to play with Gus, because his manners were the very best.', emoji: '\u{1F389}', scene: 'bg-mint-100' },
    ],
  },
  {
    id: 'curious-explorer',
    title: 'Little Leo Asks Why',
    theme: 'curiosity',
    cover: '\u{1F981}',
    coverBg: 'bg-sun-200',
    pages: [
      { text: 'Little Leo wondered why the moon follows him home at night.', emoji: '\u{1F319}', scene: 'bg-lilac-100' },
      { text: 'He asked his grandpa. "The moon is far away, but it looks close," said Grandpa.', emoji: '\u{1F474}', scene: 'bg-sky-200' },
      { text: 'Leo made a telescope from a cardboard tube and looked at the stars.', emoji: '\u{1F52D}', scene: 'bg-mint-100' },
      { text: 'Asking questions is how every great explorer begins!', emoji: '\u{1F30D}', scene: 'bg-sun-100' },
    ],
  },
  {
    id: 'forest-friends',
    title: 'The Forest Friends Garden',
    theme: 'nature',
    cover: '\u{1F333}',
    coverBg: 'bg-mint-200',
    pages: [
      { text: 'Hedgehog and Frog planted a tiny seed in the forest.', emoji: '\u{1F331}', scene: 'bg-mint-100' },
      { text: 'Every morning they watered it, and every afternoon they waited.', emoji: '\u{1F4A7}', scene: 'bg-sky-100' },
      { text: 'One day, a little green shoot popped up through the soil!', emoji: '\u{1F33F}', scene: 'bg-mint-200' },
      { text: 'The seed grew into a tall tree full of apples for all the forest friends.', emoji: '\u{1F334}', scene: 'bg-sun-100' },
    ],
  },
];
