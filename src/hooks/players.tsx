import React, { useContext, useState } from "react";
import sampleSize from "lodash/sampleSize";
import Animals from "../Animals";
import type { AnimalName } from "../Animals";
import { colors } from "../constants/colors";

export type PlayerInfo = {
  name: string;
  animal: AnimalName;
  color: string;
};

// Player ids arrive as numbers (0-3) from the menu and as strings ("0"-"3")
// from boardgame.io's ctx/G, and JS object keys treat them the same.
export type PlayerId = number | string;

export type PlayerConfig = Record<PlayerId, PlayerInfo>;

const randomAnimals = sampleSize(Object.keys(Animals) as AnimalName[], 4);
const initialState: PlayerConfig = {
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

export const PlayerContext = React.createContext<{
  playerConfig: PlayerConfig;
  setPlayerConfig: React.Dispatch<React.SetStateAction<PlayerConfig>>;
}>({
  playerConfig: initialState,
  setPlayerConfig: () => {},
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerConfig, setPlayerConfig] = useState(initialState);

  return (
    <PlayerContext.Provider value={{ playerConfig, setPlayerConfig }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerConfig = () => useContext(PlayerContext);
