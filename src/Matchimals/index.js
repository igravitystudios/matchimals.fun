import React, { Component, Fragment } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  YellowBox,
} from "react-native";

import { cardHeight, cardWidth, columns } from "../constants/board";
import Deck from "../Deck";
import Button from "../Button";
import CircleButton from "../CircleButton";
import Nameplate from "../Nameplate";
import Table from "../Table";
import Menu from "../Menu";
import Victory from "../Victory";
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
    const { isMenuVisible } = this.state;
    const { backToMainMenu, playerConfig, ...rest } = this.props;
    const deck = this.props.G.deck;
    const players = this.props.G.players;
    const currentPlayer = this.props.ctx.currentPlayer;
    const gameover = this.props.ctx.gameover;

    return (
      <Fragment>
        <SafeAreaView style={styles.root}>
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
                top: 16,
                left: 16,
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
              style={styles.deck}
            />
            <Button onPress={this.onGamePass} style={styles.pass}>
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
          </View>
        </SafeAreaView>
        {gameover && (
          <Victory
            backToMainMenu={backToMainMenu}
            player={players[gameover]}
            playerConfig={playerConfig[gameover]}
          />
        )}
        {isMenuVisible && (
          <Menu
            backToMainMenu={backToMainMenu}
            onMenuToggle={this.onMenuToggle}
          />
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  deck: {
    position: "absolute",
    bottom: 156,
    left: 16,
  },
  pass: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});

export default Matchimals;
