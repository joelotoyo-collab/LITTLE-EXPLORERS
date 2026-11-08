export interface LetterInfo {
  upper: string;
  lower: string;
  word: string;
  emoji: string;
  sound: string;
  phonicsHint: string;
}

export const LETTERS: LetterInfo[] = [
  { upper: 'A', lower: 'a', word: 'Apple', emoji: '\u{1F34E}', sound: 'ah', phonicsHint: 'a says "ah" like apple' },
  { upper: 'B', lower: 'b', word: 'Ball', emoji: '\u{1F3BE}', sound: 'buh', phonicsHint: 'b says "buh" like ball' },
  { upper: 'C', lower: 'c', word: 'Cat', emoji: '\u{1F431}', sound: 'kuh', phonicsHint: 'c says "kuh" like cat' },
  { upper: 'D', lower: 'd', word: 'Dog', emoji: '\u{1F436}', sound: 'duh', phonicsHint: 'd says "duh" like dog' },
  { upper: 'E', lower: 'e', word: 'Elephant', emoji: '\u{1F418}', sound: 'eh', phonicsHint: 'e says "eh" like elephant' },
  { upper: 'F', lower: 'f', word: 'Fish', emoji: '\u{1F41F}', sound: 'fff', phonicsHint: 'f says "fff" like fish' },
  { upper: 'G', lower: 'g', word: 'Giraffe', emoji: '\u{1F992}', sound: 'guh', phonicsHint: 'g says "guh" like giraffe' },
  { upper: 'H', lower: 'h', word: 'Hat', emoji: '\u{1F3A9}', sound: 'huh', phonicsHint: 'h says "huh" like hat' },
  { upper: 'I', lower: 'i', word: 'Ice cream', emoji: '\u{1F366}', sound: 'ih', phonicsHint: 'i says "ih" like ice cream' },
  { upper: 'J', lower: 'j', word: 'Juice', emoji: '\u{1F9C3}', sound: 'juh', phonicsHint: 'j says "juh" like juice' },
  { upper: 'K', lower: 'k', word: 'Kite', emoji: '\u{1FA81}', sound: 'kuh', phonicsHint: 'k says "kuh" like kite' },
  { upper: 'L', lower: 'l', word: 'Lion', emoji: '\u{1F981}', sound: 'luh', phonicsHint: 'l says "luh" like lion' },
  { upper: 'M', lower: 'm', word: 'Monkey', emoji: '\u{1F435}', sound: 'mmm', phonicsHint: 'm says "mmm" like monkey' },
  { upper: 'N', lower: 'n', word: 'Nut', emoji: '\u{1F95C}', sound: 'nnn', phonicsHint: 'n says "nnn" like nut' },
  { upper: 'O', lower: 'o', word: 'Octopus', emoji: '\u{1F419}', sound: 'oh', phonicsHint: 'o says "oh" like octopus' },
  { upper: 'P', lower: 'p', word: 'Penguin', emoji: '\u{1F427}', sound: 'puh', phonicsHint: 'p says "puh" like penguin' },
  { upper: 'Q', lower: 'q', word: 'Queen', emoji: '\u{1F451}', sound: 'kwuh', phonicsHint: 'q says "kwuh" like queen' },
  { upper: 'R', lower: 'r', word: 'Rainbow', emoji: '\u{1F308}', sound: 'rrr', phonicsHint: 'r says "rrr" like rainbow' },
  { upper: 'S', lower: 's', word: 'Sun', emoji: '\u{2600}\u{FE0F}', sound: 'sss', phonicsHint: 's says "sss" like sun' },
  { upper: 'T', lower: 't', word: 'Tree', emoji: '\u{1F333}', sound: 'tuh', phonicsHint: 't says "tuh" like tree' },
  { upper: 'U', lower: 'u', word: 'Umbrella', emoji: '\u{2602}\u{FE0F}', sound: 'uh', phonicsHint: 'u says "uh" like umbrella' },
  { upper: 'V', lower: 'v', word: 'Violin', emoji: '\u{1F3BB}', sound: 'vvv', phonicsHint: 'v says "vvv" like violin' },
  { upper: 'W', lower: 'w', word: 'Whale', emoji: '\u{1F433}', sound: 'wuh', phonicsHint: 'w says "wuh" like whale' },
  { upper: 'X', lower: 'x', word: 'Xylophone', emoji: '\u{1F3B5}', sound: 'ks', phonicsHint: 'x says "ks" like xylophone' },
  { upper: 'Y', lower: 'y', word: 'Yo-yo', emoji: '\u{1FA80}', sound: 'yuh', phonicsHint: 'y says "yuh" like yo-yo' },
  { upper: 'Z', lower: 'z', word: 'Zebra', emoji: '\u{1F993}', sound: 'zzz', phonicsHint: 'z says "zzz" like zebra' },
];
