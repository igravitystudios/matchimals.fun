import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

import Animals from "../Animals";
import Button from "../Button";
import Confetti from "../Confetti";

const Victory = ({ backToMainMenu, player, playerConfig, style, ...rest }) => (
  <View style={[styles.root, style]} {...rest}>
    <Confetti />
    <View style={styles.modal}>
      <View
        style={[
          styles.animal,
          {
            backgroundColor: playerConfig.color || "#9F9FB7",
          },
        ]}
      >
        {React.createElement(Animals[playerConfig.animal], {
          width: 80,
          height: 80,
        })}
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{playerConfig.name} Wins!</Text>
        <Text style={styles.score}>{player.score}</Text>
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
