import React, { useContext, useEffect, useState } from "react";
import { setAudioModeAsync, useAudioPlayer } from "expo-audio";
import type { AudioPlayer } from "expo-audio";
import type { MusicContextValue } from "./types";

const backgroundMusic = require("./background-music.mp4");
const soundEffect1 = require("./sound-effect-1.mp4");
const soundEffect2 = require("./sound-effect-2.mp4");
const soundEffect3 = require("./sound-effect-3.mp4");

export const MusicContext = React.createContext<MusicContextValue>({
  paused: true,
  setPaused: () => {},
  playSoundEffect1: () => {},
  playSoundEffect2: () => {},
  playSoundEffect3: () => {},
});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [paused, setPaused] = useState(true);
  const music = useAudioPlayer(backgroundMusic);
  const effect1 = useAudioPlayer(soundEffect1);
  const effect2 = useAudioPlayer(soundEffect2);
  const effect3 = useAudioPlayer(soundEffect3);

  useEffect(() => {
    // Match react-native-video's behavior of playing despite the silent switch
    setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  useEffect(() => {
    music.loop = true;
    music.volume = 0.2;
  }, [music]);

  useEffect(() => {
    if (paused) {
      music.pause();
    } else {
      music.play();
    }
  }, [paused, music]);

  const playEffect = (player: AudioPlayer) => () => {
    player.seekTo(0);
    player.play();
  };

  return (
    <MusicContext.Provider
      value={{
        paused,
        setPaused,
        playSoundEffect1: playEffect(effect1),
        playSoundEffect2: playEffect(effect2),
        playSoundEffect3: playEffect(effect3),
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
