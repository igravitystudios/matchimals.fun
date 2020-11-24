import React from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "../constants/colors";
import Button from "../Button";
import PlayerButton from "../PlayerButton";
import { useMusic } from "../Music";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Menu = ({ startGame }) => {
  const music = useMusic();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground source={require("./trianglify.png")} style={styles.root}>
      <>
        <Text style={styles.text}>HOW MANY PLAYERS?</Text>
        <View
          style={{
            width: 280,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <PlayerButton
            number={1}
            onPress={() => {
              startGame(1);
            }}
            style={{ margin: 6 }}
          />
          <PlayerButton
            number={2}
            onPress={() => {
              startGame(2);
            }}
            style={{ margin: 6 }}
          />
          <PlayerButton
            number={3}
            onPress={() => {
              startGame(3);
            }}
            style={{ margin: 6 }}
          />
          <PlayerButton
            number={4}
            onPress={() => {
              startGame(4);
            }}
            style={{ margin: 6 }}
          />
        </View>

        {Platform.OS !== "web" && music && (
          <Button
            onPress={() => music?.setPaused(!music?.paused)}
            style={{
              position: "absolute",
              bottom: Math.max(insets.bottom, 8),
              right: Math.max(insets.right, 8),
            }}
          >
            {music?.paused ? "TURN MUSIC ON" : "TURN MUSIC OFF"}
          </Button>
        )}
      </>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 8,
  },
  active: {
    borderColor: "blue",
  },
  text: {
    color: colors.grayDark,
    fontFamily: "Dimbo",
    fontSize: 48,
    lineHeight: 60,
    marginBottom: 32,
  },
});

export default Menu;
