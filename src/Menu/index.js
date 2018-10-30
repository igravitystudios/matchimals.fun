import React from "react";
import { StyleSheet, View } from "react-native";

import Button from "../Button";

const Menu = ({ backToMainMenu, onMenuToggle }) => (
  <View style={styles.root}>
    <Button color="#fff" onPress={backToMainMenu}>
      EXIT TO MAIN MENU
    </Button>
    <Button color="#fff" onPress={onMenuToggle}>
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
