export interface ColourInfo {
  id: string;
  name: string;
  hex: string;
  objects: string[];
}

export const COLOURS: ColourInfo[] = [
  { id: 'red', name: 'Red', hex: '#E65555', objects: ['\u{1F34E}', '\u{1F692}', '\u{1F339}', '\u{1F353}'] },
  { id: 'blue', name: 'Blue', hex: '#2AA3E6', objects: ['\u{1F433}', '\u{1FAD0}', '\u{1F30A}', '\u{1F699}'] },
  { id: 'yellow', name: 'Yellow', hex: '#FFC21A', objects: ['\u{1F34C}', '\u{1F33B}', '\u{1F425}', '\u{2B50}'] },
  { id: 'green', name: 'Green', hex: '#1FA876', objects: ['\u{1F438}', '\u{1F966}', '\u{1F348}', '\u{1F422}'] },
  { id: 'orange', name: 'Orange', hex: '#FF8A3D', objects: ['\u{1F34A}', '\u{1F955}', '\u{1F98A}', '\u{1F383}'] },
  { id: 'purple', name: 'Purple', hex: '#8E6BD6', objects: ['\u{1F347}', '\u{1F52E}', '\u{1F40C}', '\u{1F386}'] },
  { id: 'pink', name: 'Pink', hex: '#FF7AA8', objects: ['\u{1F338}', '\u{1F437}', '\u{1F380}', '\u{1F9C1}'] },
  { id: 'brown', name: 'Brown', hex: '#8A5A3C', objects: ['\u{1F43B}', '\u{1F330}', '\u{1F36B}', '\u{1F41B}'] },
  { id: 'black', name: 'Black', hex: '#2B2B33', objects: ['\u{1F3B1}', '\u{1F41C}', '\u{270F}\u{FE0F}', '\u{1F987}'] },
  { id: 'white', name: 'White', hex: '#FFFFFF', objects: ['\u{1F95A}', '\u{2601}\u{FE0F}', '\u{1F9A2}', '\u{1F9C2}'] },
  { id: 'grey', name: 'Grey', hex: '#8C97AA', objects: ['\u{1F418}', '\u{1F42D}', '\u{1F43A}', '\u{1FAA8}'] },
];
