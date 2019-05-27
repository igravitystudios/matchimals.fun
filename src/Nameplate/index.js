import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Animals from "../Animals";

const Nameplate = ({ active, player, playerConfig, style, ...rest }) => (
  <Animatable.View
    style={[styles.root, active ? styles.active : styles.inactive, style]}
    transition={["opacity", "scaleX", "scaleY"]}
    {...rest}
  >
    <View
      style={[
        styles.animal,
        {
          backgroundColor: playerConfig.color || "#9F9FB7",
        },
      ]}
    >
      {React.createElement(Animals[playerConfig.animal], {
        width: 60,
        height: 60,
      })}
    </View>
    <View style={styles.details}>
      <Text style={styles.name}>{playerConfig.name}</Text>
      <Text style={styles.score}>{player.score}</Text>
    </View>
  </Animatable.View>
);

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 44,
    borderColor: "#fff",
    borderWidth: 4,
    marginBottom: 4,
  },
  animal: {
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  active: {},
  inactive: {
    opacity: 0.8,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  details: {
    width: 120,
    height: 80,
    justifyContent: "center",
    paddingLeft: 16,
  },
  name: {
    color: "#17171b",
    fontFamily: "Dimbo",
    fontSize: 24,
    lineHeight: 30,
    marginTop: 4, // The line-height on this font is funky, this visually centers it
  },
  score: {
    color: "#17171b",
    fontFamily: "Dimbo",
    fontSize: 48,
    lineHeight: 60,
    marginTop: -6, // The line-height on this font is funky, this visually centers it
  },
});

export default Nameplate;
