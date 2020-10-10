import React, { useContext, useState } from "react";
import { Platform } from "react-native";
import Video from "react-native-video";

const backgroundMusic = require("./background-music.mp4");
const soundEffect1 = require("./sound-effect-1.mp4");
const soundEffect2 = require("./sound-effect-2.mp4");
const soundEffect3 = require("./sound-effect-3.mp4");

export const MusicContext = React.createContext({
  paused: true,
  setPaused: () => {},
  playSoundEffect1: () => {},
  playSoundEffect2: () => {},
  playSoundEffect3: () => {},
});

export const useMusic = () => useContext(MusicContext);

// TODO: This was quick and dirty,
// everything could probably be refactored/renamed to be more clear
export const MusicProvider = ({ children }) => {
  const [paused, setPaused] = useState(true);
  const [pauseSoundEffect1, setPauseSoundEffect1] = useState(true);
  const [pauseSoundEffect2, setPauseSoundEffect2] = useState(true);
  const [pauseSoundEffect3, setPauseSoundEffect3] = useState(true);
  return (
    <MusicContext.Provider
      value={{
        paused,
        setPaused,
        playSoundEffect1: () => setPauseSoundEffect1(false),
        playSoundEffect2: () => setPauseSoundEffect2(false),
        playSoundEffect3: () => setPauseSoundEffect3(false),
      }}
    >
      <>
        {/* Background music */}
        <Video
          audioOnly
          repeat
          paused={paused}
          source={backgroundMusic}
          volume={0.2}
        />

        {/* Sound effect for connecting cards */}
        <Video
          audioOnly
          repeat={Platform.OS === "ios" ? true : false}
          paused={pauseSoundEffect1}
          source={soundEffect1}
          onEnd={() => setPauseSoundEffect1(true)}
        />

        {/* Sound effect for passing a card */}
        <Video
          audioOnly
          repeat={Platform.OS === "ios" ? true : false}
          paused={pauseSoundEffect2}
          source={soundEffect2}
          onEnd={() => setPauseSoundEffect2(true)}
        />

        {/* Sound effect for a mismatched card */}
        <Video
          audioOnly
          repeat={Platform.OS === "ios" ? true : false}
          paused={pauseSoundEffect3}
          source={soundEffect3}
          onEnd={() => setPauseSoundEffect3(true)}
        />

        {children}
      </>
    </MusicContext.Provider>
  );
};
