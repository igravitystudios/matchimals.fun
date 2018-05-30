import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import Orientation from "react-native-orientation";

import { cardHeight, cardWidth, columns, rows } from "./constants/board";
import Deck from "./components/Deck";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import Table from "./Table";
import Menu from "./Menu";

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
    const cardTop = measurements.pagey;
    const tableLeft = this._table._previousLeft;
    const tableTop = this._table._previousTop;

    // console.log(this._table);
    const targetCell = 236;
    this.props.moves.clickCell(targetCell);
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

  onScrollToCenter = () => {
    console.log(this._table);
  };

  render() {
    const { isMenuVisible } = this.state;
    const { ...rest } = this.props;
    console.log(this.props.G.players);

    return (
      <View style={styles.root}>
        <StatusBar hidden />
        <Table
          ref={(tableComponent) => {
            this._table = tableComponent;
          }}
          {...rest}
        />
        <Deck
          cards={this.props.G.players[this.props.ctx.currentPlayer].deck}
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
