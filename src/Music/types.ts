// The shape of the context exposed by the expo-audio MusicProvider.
export type MusicContextValue = {
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
  soundEffectsEnabled: boolean;
  setSoundEffectsEnabled: (enabled: boolean) => void;
  playSoundEffect1: () => void;
  playSoundEffect2: () => void;
  playSoundEffect3: () => void;
};
