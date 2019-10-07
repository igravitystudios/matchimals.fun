import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import colors from "../constants/colors";
import Button from "../Button";
import { MusicContext } from "../Music";

const Menu = ({ backToMainMenu, onMenuToggle }) => {
  const music = useContext(MusicContext);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onMenuToggle}
      style={styles.root}
    >
      <View style={styles.underlay} />
      <View style={styles.root}>
        {music && (
          <Button
            onPress={() => music.setPaused(!music.paused)}
            style={{ marginBottom: 128 }}
          >
            {music.paused ? "🔇 " : "🔈 "} MUSIC
          </Button>
        )}
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
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999999999, // active card will have a zIndex of `e.timeStamp`- so this needs to be larger
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
