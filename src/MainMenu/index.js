import React, { Fragment } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import Button from "../Button";

const Menu = ({ numPlayers, onNumPlayersChange, startGame }) => (
  <View style={styles.root}>
    <ImageBackground source={require("./trianglify.png")} style={styles.root}>
      <Fragment>
        <Text>How many players?</Text>
        <Button
          onPress={() => onNumPlayersChange(1)}
          style={numPlayers === 1 && styles.active}
        >
          1
        </Button>
        <Button
          onPress={() => onNumPlayersChange(2)}
          style={numPlayers === 2 && styles.active}
        >
          2
        </Button>
        <Button
          onPress={() => onNumPlayersChange(3)}
          style={numPlayers === 3 && styles.active}
        >
          3
        </Button>
        <Button
          onPress={() => onNumPlayersChange(4)}
          style={numPlayers === 4 && styles.active}
        >
          4
        </Button>

        <Button color="#fff" onPress={startGame}>
          Start Game
        </Button>
      </Fragment>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    borderColor: "blue",
  },
});

export default Menu;
