import React, { useState } from "react";
import Video from "react-native-video";

const backgroundMusic = require("./music.mp4");

export const MusicContext = React.createContext({
  paused: true,
  setPaused: () => {},
});

const MusicProvider = ({ children }) => {
  const [paused, setPaused] = useState(true);
  return (
    <MusicContext.Provider
      value={{
        paused,
        setPaused,
      }}
    >
      <>
        <Video
          audioOnly
          repeat
          paused={paused}
          source={backgroundMusic}
          ref={(ref) => {
            this.player = ref;
          }}
          onBuffer={() => {}}
          onError={() => {}}
        />
        {children}
      </>
    </MusicContext.Provider>
  );
};

export default MusicProvider;
