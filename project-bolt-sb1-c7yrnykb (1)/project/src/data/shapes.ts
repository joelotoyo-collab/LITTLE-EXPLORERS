export type ShapeId = 'circle' | 'square' | 'triangle' | 'rectangle' | 'oval' | 'star' | 'heart' | 'diamond';

export interface ShapeInfo {
  id: ShapeId;
  name: string;
  color: string;
  associations: string[];
  sentence: string;
}

export const SHAPES: ShapeInfo[] = [
  { id: 'circle', name: 'Circle', color: '#FFC21A', associations: ['\u{1F355}', '\u{1F315}', '\u{26BD}', '\u{1F36A}'], sentence: 'A circle is round all the way around, like a pizza.' },
  { id: 'square', name: 'Square', color: '#2AA3E6', associations: ['\u{1F4F1}', '\u{1F9F1}', '\u{1F4E6}', '\u{1F5BC}\u{FE0F}'], sentence: 'A square has four equal sides, like a block.' },
  { id: 'triangle', name: 'Triangle', color: '#FF8A3D', associations: ['\u{26F0}\u{FE0F}', '\u{1F370}', '\u{1F6A9}', '\u{1F3D5}\u{FE0F}'], sentence: 'A triangle has three sides and three corners.' },
  { id: 'rectangle', name: 'Rectangle', color: '#6EDCB0', associations: ['\u{1F6AA}', '\u{1F4D6}', '\u{1F4F1}', '\u{1F6CF}\u{FE0F}'], sentence: 'A rectangle is long like a door or a book.' },
  { id: 'oval', name: 'Oval', color: '#FF7AA8', associations: ['\u{1F95A}', '\u{1F3C8}', '\u{1F48A}', '\u{1F3C9}'], sentence: 'An oval is like a squashed circle, like an egg.' },
  { id: 'star', name: 'Star', color: '#FFD84D', associations: ['\u{2B50}', '\u{1F31F}', '\u{1F3C6}', '\u{1F9F8}'], sentence: 'A star has pointy arms that sparkle in the night sky.' },
  { id: 'heart', name: 'Heart', color: '#FF5F7A', associations: ['\u{2764}\u{FE0F}', '\u{1F49B}', '\u{1F381}', '\u{1F41E}'], sentence: 'A heart is a shape we draw to show we love someone.' },
  { id: 'diamond', name: 'Diamond', color: '#4DBDF5', associations: ['\u{1F48E}', '\u{1FA81}', '\u{1F3F7}\u{FE0F}', '\u{1F36C}'], sentence: 'A diamond is a square that has been turned on its corner.' },
];
