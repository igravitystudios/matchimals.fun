import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import Button from "../Button";

const Menu = ({ startGame }) => (
  <View style={styles.root}>
    <ImageBackground source={require("./trianglify.png")} style={styles.root}>
      <Button color="#fff" style={styles.menu} onPress={startGame}>
        Start Game
      </Button>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    margin: 8,
  },
});

export default Menu;
