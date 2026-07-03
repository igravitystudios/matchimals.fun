// The shape of the context exposed by the expo-audio MusicProvider.
export type MusicContextValue = {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  playSoundEffect1: () => void;
  playSoundEffect2: () => void;
  playSoundEffect3: () => void;
};
