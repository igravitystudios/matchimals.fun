import React, { useContext } from "react";

export const MusicContext = React.createContext({
  paused: true,
  setPaused: () => {},
  playSoundEffect1: () => {},
  playSoundEffect2: () => {},
  playSoundEffect3: () => {},
});

export const useMusic = () => useContext(MusicContext);

// Didn't want to spend the time building sound for the web- so this file sets
// up an empty provider for the web so it doesn't crash
export const MusicProvider = ({ children }) => {
  return (
    <MusicContext.Provider
      value={{
        paused: true,
        setPaused: () => {},
        playSoundEffect1: () => {},
        playSoundEffect2: () => {},
        playSoundEffect3: () => {},
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
