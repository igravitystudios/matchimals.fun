import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, YellowBox } from "react-native";
import { Client } from "boardgame.io/react-native";
import SplashScreen from "react-native-splash-screen";
import colors from "./constants/colors";

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
    isMainMenuVisible: true,
    numPlayers: 1,
    playerConfig: {
      "0": {
        name: "Player 1",
        animal: "Monkey",
        color: colors.greenLight,
      },
      "1": {
        name: "Player 2",
        animal: "Wolf",
        color: colors.blueLight,
      },
      "2": {
        name: "Player 3",
        animal: "Gorilla",
        color: colors.redLight,
      },
      "3": {
        name: "Player 4",
        animal: "Mouse",
        color: colors.yellowLight,
      },
    },
  };

  componentDidMount() {
    if (Platform.OS !== "web") {
      SplashScreen.hide();
    }
  }

  onNumPlayersChange = (numPlayers) => {
    this.setState({
      numPlayers,
    });
  };

  backToMainMenu = () => {
    this.setState({
      isMainMenuVisible: true,
    });
  };

  startGame = () => {
    this.setState({
      isMainMenuVisible: false,
    });
  };

  render() {
    const { isMainMenuVisible, numPlayers, playerConfig } = this.state;
    const MatchimalsClient = Client({
      board: Matchimals,
      game: Game,
      numPlayers,
      debug: false,
    });

    return (
      <View style={styles.root}>
        <StatusBar hidden />
        {isMainMenuVisible ? (
          <MainMenu
            numPlayers={numPlayers}
            onNumPlayersChange={this.onNumPlayersChange}
            startGame={this.startGame}
          />
        ) : (
          <MatchimalsClient
            backToMainMenu={this.backToMainMenu}
            playerConfig={playerConfig}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "relative",
    width: "100%",
    height: Platform.OS === "web" ? "100vh" : "100%",
    overflow: "hidden",
  },
});

export default App;
