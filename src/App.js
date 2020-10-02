import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Client } from "boardgame.io/react-native";
import colors from "./constants/colors";

import Matchimals from "./Matchimals";
import game from "./Matchimals/game";
import MainMenu from "./MainMenu";
import Music from "./Music";

class App extends Component {
  state = {
    isMainMenuVisible: true,
    numPlayers: 1,
    playerConfig: {
      0: {
        name: "Player 1",
        animal: "Monkey",
        color: colors.greenLight,
      },
      1: {
        name: "Player 2",
        animal: "Wolf",
        color: colors.blueLight,
      },
      2: {
        name: "Player 3",
        animal: "Gorilla",
        color: colors.redLight,
      },
      3: {
        name: "Player 4",
        animal: "Mouse",
        color: colors.yellowLight,
      },
    },
  };

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
      game,
      numPlayers,
      debug: false,
    });

    return (
      <Music>
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
      </Music>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "relative",
    width: "100%",
    height: Platform.OS === "web" ? "100vh" : "100%",
    overflow: "hidden",
    backgroundColor: colors.grayDark,
  },
});

export default App;
