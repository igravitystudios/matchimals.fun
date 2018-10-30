import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, YellowBox } from "react-native";

import { cardHeight, cardWidth, columns } from "../constants/board";
import Deck from "../Deck";
import Button from "../Button";
import CircleButton from "../CircleButton";
import Nameplate from "../Nameplate";
import Table from "../Table";
import Menu from "../Menu";
import Confetti from "../Confetti";
import { isLegalMove } from "../Game";

// lol– these'll be fixed soon.
// 1. https://github.com/facebook/react-native/issues/18868
// 2. https://github.com/facebook/react-native/issues/17504
if (Platform.OS !== "web") {
  YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader requires main queue",
  ]);
}

class Matchimals extends Component {
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

  onCardDrop = (measurements) => {
    const { ctx, G } = this.props;

    // Get the top left corner of the card in relation to the viewport
    const cardLeft = measurements.pageX;
    const cardTop = measurements.pageY;

    // Get the top left corner of the viewport in relation to the entire table
    const tableLeft = this._table._previousLeft;
    const tableTop = this._table._previousTop;

    // Calculate the total distance from the table's edge to the card's edge
    const distanceLeft = Math.abs(tableLeft - cardLeft);
    const distanceTop = Math.abs(tableTop - cardTop);

    // Calculate the total distance in "cells"
    const cellsFromLeft = Math.round(distanceLeft / cardWidth);
    const cellsFromTop = Math.round(distanceTop / cardHeight);

    // Calculate the target cell's id
    const targetCell = cellsFromTop * columns + cellsFromLeft;

    return new Promise((resolve) => {
      if (isLegalMove(G, ctx, targetCell)) {
        this.props.moves.placeCard(targetCell);
      }
      resolve();
    });
  };

  onGamePass = () => {
    this.props.moves.pass();
  };

  onMenuToggle = () => {
    this.setState((state) => ({
      isMenuVisible: !state.isMenuVisible,
    }));
  };

  render() {
    const { isMenuVisible, playerConfig } = this.state;
    const { backToMainMenu, ...rest } = this.props;
    const deck = this.props.G.deck;
    const players = this.props.G.players;
    const currentPlayer = this.props.ctx.currentPlayer;
    const gameover = this.props.ctx.gameover;

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
          onPress={this.onMenuToggle}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          ?
        </CircleButton>
        {gameover && <Confetti />}
        {isMenuVisible && (
          <Menu
            backToMainMenu={backToMainMenu}
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
    overflow: "hidden",
  },
});

export default Matchimals;
