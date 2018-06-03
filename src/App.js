import React, { Component } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  YellowBox,
} from "react-native";
import Orientation from "react-native-orientation";

import { cardHeight, cardWidth, columns } from "./constants/board";
import Deck from "./components/Deck";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import Table from "./Table";
import Menu from "./Menu";

// lol– these'll be fixed soon.
// 1. https://github.com/facebook/react-native/issues/18868
// 2. https://github.com/facebook/react-native/issues/17504
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader requires main queue",
]);

class App extends Component {
  state = {
    players: 2,
    isMenuVisible: false,
  };

  componentDidMount() {
    if (Platform.OS !== "web") {
      Orientation.lockToLandscape();
    }
  }

  onCardDrop = (measurements) => {
    const cardLeft = measurements.pageX;
    const cardTop = measurements.pageY;
    const tableLeft = this._table._previousLeft;
    const tableTop = this._table._previousTop;

    console.log({ cardLeft, cardTop, tableLeft, tableTop });

    const distanceLeft = Math.abs(tableLeft - cardLeft);
    const distanceTop = Math.abs(tableTop - cardTop);
    const cellsFromLeft = Math.round(distanceLeft / cardWidth);
    const cellsFromTop = Math.round(distanceTop / cardHeight);
    const targetCell = cellsFromTop * columns + cellsFromLeft;

    console.log({
      distanceLeft,
      distanceTop,
      cellsFromLeft,
      cellsFromTop,
      targetCell,
    });

    this.props.moves.placeCard(targetCell);
  };

  onGamePass = () => {
    this.props.moves.pass();
    this.props.events.endTurn();
  };

  onGameReset = () => {
    // e.preventDefault();
    // this.props.moves.resetGame();
    this.onMenuToggle();
  };

  onMenuToggle = () => {
    this.setState((state) => ({
      isMenuVisible: !state.isMenuVisible,
    }));
  };

  onScrollToCenter = () => {};

  render() {
    const { isMenuVisible } = this.state;
    const { ...rest } = this.props;
    const players = this.props.G.players;
    const currentPlayer = this.props.ctx.currentPlayer;

    return (
      <View style={styles.root}>
        <StatusBar hidden />
        <Table
          ref={(tableComponent) => {
            this._table = tableComponent;
          }}
          {...rest}
        />
        <View
          style={{
            position: "absolute",
            top: 72,
            left: 72,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
        >
          <Text>Player {parseInt(currentPlayer, 10) + 1}'s Turn</Text>

          {Object.keys(players).map((playerIndex) => {
            const isPlayerActive = playerIndex === currentPlayer;
            return (
              <View key={playerIndex}>
                <View>
                  <Text>Player {parseInt(playerIndex, 10) + 1} </Text>
                </View>
                <View>
                  <Text>{players[playerIndex].score}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <Deck
          cards={players[currentPlayer].deck}
          onCardDrop={this.onCardDrop}
          style={{
            position: "absolute",
            bottom: 156,
            left: 72,
          }}
        />
        <Button
          onPress={this.onGamePass}
          style={{
            position: "absolute",
            bottom: 16,
            left: 200,
          }}
        >
          PASS
        </Button>
        <CircleButton
          onPress={this.onScrollToCenter}
          style={{
            position: "absolute",
            bottom: 16,
            right: 96,
          }}
        >
          ⊕
        </CircleButton>
        <CircleButton
          onPress={this.onMenuToggle}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
        >
          ?
        </CircleButton>
        {isMenuVisible && (
          <Menu
            onGameReset={this.onGameReset}
            onMenuToggle={this.onMenuToggle}
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
    height: "100%",
  },
});

export default App;
