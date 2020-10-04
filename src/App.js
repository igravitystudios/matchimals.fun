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
  };

  backToMainMenu = () => {
    this.setState({
      isMainMenuVisible: true,
    });
  };

  startGame = (numPlayers) => {
    this.setState({
      numPlayers,
      isMainMenuVisible: false,
    });
  };

  render() {
    const { isMainMenuVisible, numPlayers } = this.state;
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
            <MainMenu startGame={this.startGame} />
          ) : (
            <MatchimalsClient backToMainMenu={this.backToMainMenu} />
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
