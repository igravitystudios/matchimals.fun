import React, { useContext, useState } from "react";
import sampleSize from "lodash/sampleSize";
import Animals from "../Animals";
import { colors } from "../constants/colors";

const randomAnimals = sampleSize(Object.keys(Animals), 4);
const initialState = {
  0: {
    name: randomAnimals[0],
    animal: randomAnimals[0],
    color: colors.greenLight,
  },
  1: {
    name: randomAnimals[1],
    animal: randomAnimals[1],
    color: colors.blueLight,
  },
  2: {
    name: randomAnimals[2],
    animal: randomAnimals[2],
    color: colors.redLight,
  },
  3: {
    name: randomAnimals[3],
    animal: randomAnimals[3],
    color: colors.yellowLight,
  },
};

export const PlayerContext = React.createContext({
  playerConfig: {},
  setPlayerConfig: () => {},
});

export const PlayerProvider = ({ children }) => {
  const [playerConfig, setPlayerConfig] = useState(initialState);

  return (
    <PlayerContext.Provider value={{ playerConfig, setPlayerConfig }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerConfig = () => useContext(PlayerContext);
