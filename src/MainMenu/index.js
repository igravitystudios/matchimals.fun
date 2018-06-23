import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import Button from "../Button";

const Menu = ({}) => (
  <View style={styles.root}>
    <ImageBackground source={require("./trianglify.png")} style={styles.root}>
      <Button color="#fff" style={styles.menu}>
        LOL
      </Button>
    </ImageBackground>
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
