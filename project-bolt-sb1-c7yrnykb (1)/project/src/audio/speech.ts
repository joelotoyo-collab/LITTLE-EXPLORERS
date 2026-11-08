import { backgroundMusic } from '@/audio/BackgroundMusic';

export interface SpeechOptions {
  pitch?: number;
  rate?: number;
}

let activeUtterance: SpeechSynthesisUtterance | null = null;
let releaseMusicDucking: (() => void) | null = null;

function speechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function pickEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  return voices.find((voice) => voice.lang.startsWith('en') && voice.localService) ?? voices.find((voice) => voice.lang.startsWith('en'));
}

function duckMusicWhileSpeaking(text: string): () => void {
  backgroundMusic.beginVoice();
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    backgroundMusic.endVoice();
  };
  window.setTimeout(release, 2000 + text.length * 90);
  return release;
}

export function speakText(text: string, volume: number, options: SpeechOptions = {}): boolean {
  if (!speechAvailable()) return false;
  const synth = window.speechSynthesis;
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickEnglishVoice(synth.getVoices());
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang ?? 'en-US';
  utterance.volume = volume;
  utterance.pitch = options.pitch ?? 1.25;
  utterance.rate = options.rate ?? 0.88;

  const release = duckMusicWhileSpeaking(text);
  releaseMusicDucking = release;
  const finish = () => {
    if (activeUtterance === utterance) activeUtterance = null;
    release();
  };
  utterance.onend = finish;
  utterance.onerror = finish;

  activeUtterance = utterance;
  synth.speak(utterance);
  return true;
}

export function stopSpeaking(): void {
  if (!speechAvailable()) return;
  window.speechSynthesis.cancel();
  activeUtterance = null;
  releaseMusicDucking?.();
  releaseMusicDucking = null;
}
