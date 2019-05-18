import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import colors from "../constants/colors";
import Button from "../Button";

const Menu = ({ backToMainMenu, onMenuToggle }) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={onMenuToggle}
    style={styles.root}
  >
    <View style={styles.underlay} />
    <View style={styles.root}>
      <Button
        color={colors.redLight}
        onPress={backToMainMenu}
        style={{ marginBottom: 32 }}
      >
        EXIT TO MAIN MENU
      </Button>
      <Button color="#fff" onPress={onMenuToggle}>
        BACK TO GAME
      </Button>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  // Hacky way to have an opaque background without using rgba
  underlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.grayDark,
    opacity: 0.9,
  },
  menu: {
    margin: 8,
  },
});

export default Menu;
