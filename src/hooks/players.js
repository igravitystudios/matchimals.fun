import { useState } from "react";
import sampleSize from "lodash/sampleSize";
import Animals from "../Animals";
import colors from "../constants/colors";

export const randomAnimals = sampleSize(Object.keys(Animals), 4);

export const usePlayerConfig = () => {
  const [playerConfig, setPlayerConfig] = useState({
    0: {
      name: "Player 1",
      animal: randomAnimals[0],
      color: colors.greenLight,
    },
    1: {
      name: "Player 2",
      animal: randomAnimals[1],
      color: colors.blueLight,
    },
    2: {
      name: "Player 3",
      animal: randomAnimals[2],
      color: colors.redLight,
    },
    3: {
      name: "Player 4",
      animal: randomAnimals[3],
      color: colors.yellowLight,
    },
  });

  return [playerConfig, setPlayerConfig];
};
