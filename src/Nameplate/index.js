import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animals from "../Animals";

const Nameplate = ({ active, player, playerConfig, style, ...rest }) => (
  <View
    style={[styles.root, active ? styles.active : styles.inactive, style]}
    {...rest}
  >
    <View
      style={[
        styles.animal,
        {
          backgroundColor: playerConfig.color || "#000",
        },
      ]}
    >
      {React.createElement(Animals[playerConfig.animal], {
        width: 48,
        height: 48,
      })}
    </View>
    <View style={styles.details}>
      <Text style={styles.name}>{playerConfig.name}</Text>
      <Text style={styles.score}>{player.score}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 36,
    borderColor: "#fff",
    borderWidth: 4,
    marginBottom: 24,
  },
  animal: {
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    zIndex: 1,
  },
  active: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  inactive: {
    opacity: 0.8,
  },
  details: {
    maxHeight: 64,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 32,
    paddingLeft: 16,
  },
  name: {
    color: "#302C3B",
    fontFamily: "Dimbo",
    fontSize: 18,
  },
  score: {
    color: "#302C3B",
    fontFamily: "Dimbo",
    fontSize: 48,
    lineHeight: 54,
    height: 48,
  },
});

export default Nameplate;
