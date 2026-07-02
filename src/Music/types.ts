// Shared between the native (expo-audio) and web (no-op) variants so both
// providers expose the same context shape.
export type MusicContextValue = {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  playSoundEffect1: () => void;
  playSoundEffect2: () => void;
  playSoundEffect3: () => void;
};
