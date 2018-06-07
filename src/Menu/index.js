import React from "react";
import { StyleSheet, View } from "react-native";

import Button from "../Button";
import Confetti from "../Confetti";

const Menu = ({ onMenuToggle, onGameReset }) => (
  <View style={styles.root}>
    <Confetti />
    {/* <Button color="#fff" style={styles.menu} onPress={onGameReset}>
      RESET GAME
    </Button> */}
    <Button color="#fff" style={styles.menu} onPress={onMenuToggle}>
      BACK TO GAME
    </Button>
  </View>
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(20,13,10,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    margin: 8,
  },
});

export default Menu;
