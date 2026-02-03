import React, { useContext, useState, useEffect, useRef } from "react";
import { useAudioPlayer } from "expo-audio";

const backgroundMusicSource = require("../../assets/audio/background-music.mp4");
const soundEffect1Source = require("../../assets/audio/sound-effect-1.mp4");
const soundEffect2Source = require("../../assets/audio/sound-effect-2.mp4");
const soundEffect3Source = require("../../assets/audio/sound-effect-3.mp4");

export const MusicContext = React.createContext({
  paused: true,
  setPaused: () => {},
  playSoundEffect1: () => {},
  playSoundEffect2: () => {},
  playSoundEffect3: () => {},
});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [paused, setPaused] = useState(true);

  const backgroundMusic = useAudioPlayer(backgroundMusicSource, 500);
  const soundEffect1 = useAudioPlayer(soundEffect1Source, 500);
  const soundEffect2 = useAudioPlayer(soundEffect2Source, 500);
  const soundEffect3 = useAudioPlayer(soundEffect3Source, 500);

  // Configure background music
  useEffect(() => {
    if (backgroundMusic) {
      backgroundMusic.loop = true;
      backgroundMusic.volume = 0.2;
    }
  }, [backgroundMusic]);

  // Handle pause/play
  useEffect(() => {
    if (!backgroundMusic) return;
    if (paused) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
    }
  }, [paused, backgroundMusic]);

  const playSoundEffect = (player) => {
    if (!player) return;
    player.seekTo(0);
    player.play();
  };

  return (
    <MusicContext.Provider
      value={{
        paused,
        setPaused,
        playSoundEffect1: () => playSoundEffect(soundEffect1),
        playSoundEffect2: () => playSoundEffect(soundEffect2),
        playSoundEffect3: () => playSoundEffect(soundEffect3),
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
