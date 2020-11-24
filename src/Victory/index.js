import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { usePlayerConfig } from "../hooks/players";
import { colors } from "../constants/colors";

import Animals from "../Animals";
import Button from "../Button";
import Confetti from "../Confetti";

const Victory = ({ backToMainMenu, player, players, style, ...rest }) => {
  const { playerConfig } = usePlayerConfig();
  const score = players[player]?.score;
  const name = playerConfig[player]?.name;
  const backgroundColor = playerConfig[player]?.color;
  const Icon = Animals[playerConfig[player]?.animal];
  return (
    <View style={[styles.root, style]} {...rest}>
      <Confetti />
      <View style={styles.modal}>
        <View
          style={[
            styles.animal,
            {
              backgroundColor: backgroundColor || "#9F9FB7",
            },
          ]}
        >
          <Icon width={80} height={80} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{name} Wins!</Text>
          <Text style={styles.score}>{score}</Text>
          <Button
            color={colors.redLight}
            onPress={backToMainMenu}
            style={{ marginBottom: 16 }}
          >
            EXIT TO MAIN MENU
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    width: 316,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 36,
    borderColor: "#fff",
    borderWidth: 4,
    marginBottom: 4,
  },
  animal: {
    position: "absolute",
    top: -60,
    left: "50%",
    marginLeft: -60,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#fff",
  },
  details: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    textAlign: "center",
    color: "#17171b",
    fontFamily: "Dimbo",
    fontSize: 48,
    lineHeight: 60,
    marginTop: 72,
  },
  score: {
    textAlign: "center",
    color: "#17171b",
    fontFamily: "Dimbo",
    fontSize: 96,
    lineHeight: 128,
    marginTop: -12,
  },
});

export default Victory;
