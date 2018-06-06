import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, YellowBox } from "react-native";
import Orientation from "react-native-orientation";

import { cardHeight, cardWidth, columns } from "./constants/board";
import Deck from "./components/Deck";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import Nameplate from "./components/Nameplate";
import Table from "./Table";
import Menu from "./Menu";
import { isLegalMove } from "./Game";

// lol– these'll be fixed soon.
// 1. https://github.com/facebook/react-native/issues/18868
// 2. https://github.com/facebook/react-native/issues/17504
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader requires main queue",
]);

class App extends Component {
  state = {
    isMenuVisible: false,
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
    if (Platform.OS !== "web") {
      Orientation.lockToLandscape();
    }
  }

  onCardDrop = (measurements) => {
    const cardLeft = measurements.pageX;
    const cardTop = measurements.pageY;
    const tableLeft = this._table._previousLeft;
    const tableTop = this._table._previousTop;

    const distanceLeft = Math.abs(tableLeft - cardLeft);
    const distanceTop = Math.abs(tableTop - cardTop);
    const cellsFromLeft = Math.round(distanceLeft / cardWidth);
    const cellsFromTop = Math.round(distanceTop / cardHeight);
    const targetCell = cellsFromTop * columns + cellsFromLeft;

    const { ctx, G } = this.props;
    if (isLegalMove(G, ctx, targetCell)) {
      this.props.moves.placeCard(targetCell);
    }
  };

  onGamePass = () => {
    this.props.moves.pass();
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

  onScrollToCenter = () => {
    this._table.scrollToCenter();
  };

  render() {
    const { isMenuVisible, playerConfig } = this.state;
    const { ...rest } = this.props;
    const deck = this.props.G.deck;
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
            top: 20,
            left: 24,
          }}
        >
          {Object.keys(players).map((playerIndex) => (
            <Nameplate
              key={playerIndex}
              active={playerIndex === currentPlayer}
              player={players[playerIndex]}
              playerConfig={playerConfig[playerIndex]}
            />
          ))}
        </View>
        <Deck
          cards={deck}
          onCardDrop={this.onCardDrop}
          style={{
            position: "absolute",
            bottom: 156,
            left: 16,
          }}
        />
        <Button
          onPress={this.onGamePass}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
        >
          PASS
        </Button>
        <CircleButton
          onPress={this.onScrollToCenter}
          style={{
            position: "absolute",
            top: 16,
            right: 96,
          }}
        >
          +
        </CircleButton>
        <CircleButton
          onPress={this.onMenuToggle}
          style={{
            position: "absolute",
            top: 16,
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
