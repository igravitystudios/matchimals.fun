import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import Animals from "../Animals";
import type { AnimalName } from "../Animals";
import Dialog from "../Dialog";
import { usePlayerConfig } from "../hooks/players";
import type { PlayerId } from "../hooks/players";

interface AnimalChooserProps {
  isVisible: boolean;
  hide: () => void;
  player: PlayerId;
  style?: StyleProp<ViewStyle>;
}

const AnimalChooser = ({
  isVisible,
  hide,
  player,
  style,
}: AnimalChooserProps) => {
  const { playerConfig, setPlayerConfig } = usePlayerConfig();
  const backgroundColor = playerConfig[player]?.color;

  return (
    <Dialog player={player} isVisible={isVisible} hide={hide}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {(Object.keys(Animals) as AnimalName[]).map((animal) => {
          const Icon = Animals[animal];
          return (
            <View key={animal} style={styles.item}>
              <TouchableOpacity
                onPress={() => {
                  setPlayerConfig({
                    ...playerConfig,
                    [player]: {
                      name: animal,
                      animal: animal,
                      color: backgroundColor,
                    },
                  });
                  hide();
                }}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.animal,
                    {
                      backgroundColor: backgroundColor,
                    },
                  ]}
                >
                  <Icon width={52} height={52} />
                </View>
              </TouchableOpacity>
              <Text style={styles.name}>{animal}</Text>
            </View>
          );
        })}
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  animal: {
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    height: 72,
    borderRadius: 40,
  },
  name: {
    color: "#17171b",
    fontFamily: "Dimbo",
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
    marginTop: 4, // The line-height on this font is funky, this visually centers it
  },
  item: {
    margin: 16,
  },
});

export default AnimalChooser;
