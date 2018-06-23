import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, YellowBox } from "react-native";
import { Client } from "boardgame.io/react-native";
import SplashScreen from "react-native-splash-screen";

import Matchimals from "./Matchimals";
import Game from "./Game";
import MainMenu from "./MainMenu";

// lol– these'll be fixed soon.
// 1. https://github.com/facebook/react-native/issues/18868
// 2. https://github.com/facebook/react-native/issues/17504
if (Platform.OS !== "web") {
  YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader requires main queue",
  ]);
}

class App extends Component {
  state = {
    isMenuVisible: true,
    playerConfig: {
      "0": {
        name: "Player 1",
        animal: "Monkey",
        color: "#CAE1C3",
      },
      "1": {
        name: "Player 2",
        animal: "Wolf",
        color: "#C5E5F0",
      },
    },
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  startGame = () => {
    this.setState({
      isMenuVisible: false,
    });
  };

  render() {
    const { isMenuVisible } = this.state;
    const MatchimalsClient = Client({
      board: Matchimals,
      game: Game,
      numPlayers: 2,
      debug: false,
    });

    return (
      <View style={styles.root}>
        <StatusBar hidden />
        {isMenuVisible ? (
          <MainMenu startGame={this.startGame} />
        ) : (
          <MatchimalsClient />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

export default App;
