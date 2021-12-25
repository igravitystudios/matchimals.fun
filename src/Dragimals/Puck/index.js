import React from "react";
import { StyleSheet, View } from "react-native";

import { Draggable } from "../Draggable";
import { animalColors, colors } from "../Colors";
import { animalSounds } from "../Sounds";
import { useAnimalData } from "../Sizes";

export function Puck({ active, animal }) {
  const Animal = useAnimalData(animal);

  return (
    <Draggable
      onDragEnd={() => {
        try {
          animalSounds[active][animal]?.stop(() =>
            animalSounds[active][animal]?.play(() => {})
          );
        } catch (e) {}
      }}
    >
      <View
        style={[
          styles.root,
          Animal.puckStyle,
          {
            backgroundColor: animalColors[animal],
          },
        ]}
      >
        <Animal.Icon
          width={Animal.iconSize}
          height={Animal.iconSize}
          style={Animal.iconStyle}
        />
      </View>
    </Draggable>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.grayExtraLight,
    margin: 4,
  },
});
