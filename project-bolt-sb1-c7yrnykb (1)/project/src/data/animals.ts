export type AnimalCategory = 'farm' | 'wild' | 'sea' | 'birds' | 'insects' | 'domestic';

export interface AnimalInfo {
  id: string;
  name: string;
  emoji: string;
  category: AnimalCategory;
  sound: string;
  fact: string;
  habitat: string;
}

export const ANIMAL_CATEGORIES: { id: AnimalCategory; label: string; emoji: string }[] = [
  { id: 'farm', label: 'Farm', emoji: '\u{1F69C}' },
  { id: 'wild', label: 'Wild', emoji: '\u{1F334}' },
  { id: 'sea', label: 'Sea', emoji: '\u{1F30A}' },
  { id: 'birds', label: 'Birds', emoji: '\u{1FAB6}' },
  { id: 'insects', label: 'Insects', emoji: '\u{1F98B}' },
  { id: 'domestic', label: 'Pets', emoji: '\u{1F3E0}' },
];

export const ANIMALS: AnimalInfo[] = [
  { id: 'cow', name: 'Cow', emoji: '\u{1F404}', category: 'farm', sound: 'Moo!', fact: 'Cows chew their food twice to get every bit of goodness out of it.', habitat: 'Green fields and farms' },
  { id: 'sheep', name: 'Sheep', emoji: '\u{1F411}', category: 'farm', sound: 'Baa!', fact: 'A sheep grows a brand new coat of wool every year.', habitat: 'Hills and meadows' },
  { id: 'goat', name: 'Goat', emoji: '\u{1F410}', category: 'farm', sound: 'Meh!', fact: 'Goats love climbing and can balance on very high rocks.', habitat: 'Farms and mountain paths' },
  { id: 'horse', name: 'Horse', emoji: '\u{1F434}', category: 'farm', sound: 'Neigh!', fact: 'Horses can sleep both lying down and standing up.', habitat: 'Stables, fields and farms' },
  { id: 'pig', name: 'Pig', emoji: '\u{1F416}', category: 'farm', sound: 'Oink!', fact: 'Pigs are very clever and can learn their own names.', habitat: 'Muddy farmyards' },
  { id: 'chicken', name: 'Chicken', emoji: '\u{1F414}', category: 'farm', sound: 'Cluck!', fact: 'Chickens can see colours that we cannot even imagine.', habitat: 'Farm coops and gardens' },
  { id: 'duck', name: 'Duck', emoji: '\u{1F986}', category: 'farm', sound: 'Quack!', fact: 'A duck can swim and its feathers stay dry thanks to natural oil.', habitat: 'Ponds and rivers' },
  { id: 'lion', name: 'Lion', emoji: '\u{1F981}', category: 'wild', sound: 'Roar!', fact: 'Lions are the only cats that live together in big family groups.', habitat: 'Grasslands of Africa' },
  { id: 'elephant', name: 'Elephant', emoji: '\u{1F418}', category: 'wild', sound: 'Trumpet!', fact: 'An elephant can remember friends for many, many years.', habitat: 'Forests and savannas' },
  { id: 'giraffe', name: 'Giraffe', emoji: '\u{1F992}', category: 'wild', sound: 'Hmm!', fact: 'A giraffe has the same number of neck bones as you, just much longer.', habitat: 'Open African grasslands' },
  { id: 'monkey', name: 'Monkey', emoji: '\u{1F412}', category: 'wild', sound: 'Ooh ooh!', fact: 'Monkeys use their long tails like a fifth hand to hold branches.', habitat: 'Tropical rainforests' },
  { id: 'zebra', name: 'Zebra', emoji: '\u{1F993}', category: 'wild', sound: 'Hee haw!', fact: 'Every zebra has its own unique pattern of stripes, like a fingerprint.', habitat: 'African plains' },
  { id: 'bear', name: 'Bear', emoji: '\u{1F43B}', category: 'wild', sound: 'Grrr!', fact: 'Bears sleep through the winter in cosy dens.', habitat: 'Forests and mountains' },
  { id: 'fish', name: 'Fish', emoji: '\u{1F41F}', category: 'sea', sound: 'Blub blub!', fact: 'Fish breathe underwater using tiny parts called gills.', habitat: 'Oceans, rivers and lakes' },
  { id: 'dolphin', name: 'Dolphin', emoji: '\u{1F42C}', category: 'sea', sound: 'Click click!', fact: 'Dolphins sleep with one half of their brain at a time.', habitat: 'Warm seas' },
  { id: 'octopus', name: 'Octopus', emoji: '\u{1F419}', category: 'sea', sound: 'Glub!', fact: 'An octopus has three hearts and blue blood.', habitat: 'Coral reefs' },
  { id: 'whale', name: 'Whale', emoji: '\u{1F433}', category: 'sea', sound: 'Whoooo!', fact: 'A blue whale is the biggest animal that has ever lived.', habitat: 'Deep oceans' },
  { id: 'owl', name: 'Owl', emoji: '\u{1F989}', category: 'birds', sound: 'Hoo hoo!', fact: 'Owls can turn their heads almost all the way around.', habitat: 'Forests and barns' },
  { id: 'penguin', name: 'Penguin', emoji: '\u{1F427}', category: 'birds', sound: 'Honk!', fact: 'Penguins cannot fly, but they are amazing swimmers.', habitat: 'Icy cold seas' },
  { id: 'parrot', name: 'Parrot', emoji: '\u{1F99C}', category: 'birds', sound: 'Squawk! Hello!', fact: 'Parrots can copy words and sounds they hear.', habitat: 'Tropical forests' },
  { id: 'butterfly', name: 'Butterfly', emoji: '\u{1F98B}', category: 'insects', sound: 'Flutter flutter!', fact: 'Butterflies taste with their feet.', habitat: 'Gardens and meadows' },
  { id: 'bee', name: 'Bee', emoji: '\u{1F41D}', category: 'insects', sound: 'Bzzzz!', fact: 'Bees dance to tell their friends where the flowers are.', habitat: 'Gardens and flower fields' },
  { id: 'ladybug', name: 'Ladybug', emoji: '\u{1F41E}', category: 'insects', sound: 'Buzz!', fact: 'A ladybug can eat hundreds of tiny garden pests in a day.', habitat: 'Gardens and leafy trees' },
  { id: 'dog', name: 'Dog', emoji: '\u{1F436}', category: 'domestic', sound: 'Woof woof!', fact: 'A dog can understand more than 150 words.', habitat: 'Homes and parks' },
  { id: 'cat', name: 'Cat', emoji: '\u{1F431}', category: 'domestic', sound: 'Meow!', fact: 'Cats purr when they feel happy and calm.', habitat: 'Homes and gardens' },
  { id: 'rabbit', name: 'Rabbit', emoji: '\u{1F430}', category: 'domestic', sound: 'Thump thump!', fact: 'Rabbits can see almost all the way around their heads.', habitat: 'Burrows and meadows' },
];
