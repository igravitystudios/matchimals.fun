import React, { useContext } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import colors from "../constants/colors";
import Button from "../Button";
import { MusicContext } from "../Music";

const Menu = ({ numPlayers, onNumPlayersChange, startGame }) => {
  const music = useContext(MusicContext);
  return (
    <View style={styles.root}>
      <ImageBackground source={require("./trianglify.png")} style={styles.root}>
        <>
          <Text style={styles.text}>HOW MANY PLAYERS?</Text>
          <Button
            onPress={() => onNumPlayersChange(1)}
            selected={numPlayers === 1}
            style={styles.button}
          >
            1
          </Button>
          <Button
            onPress={() => onNumPlayersChange(2)}
            selected={numPlayers === 2}
            style={styles.button}
          >
            2
          </Button>
          <Button
            onPress={() => onNumPlayersChange(3)}
            selected={numPlayers === 3}
            style={styles.button}
          >
            3
          </Button>
          <Button
            onPress={() => onNumPlayersChange(4)}
            selected={numPlayers === 4}
            style={styles.button}
          >
            4
          </Button>

          <Button
            color={colors.yellowLight}
            onPress={startGame}
            style={{ marginTop: 24 }}
          >
            START GAME
          </Button>

          {music && (
            <Button
              onPress={() => music.setPaused(!music.paused)}
              style={{ position: "absolute", bottom: 8, right: 8 }}
            >
              {music.paused ? "🔇 " : "🔈 "} MUSIC
            </Button>
          )}
        </>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
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
