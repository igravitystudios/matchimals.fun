import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Board from './Board';
// import Sidebar from './Sidebar';
// import Menu from './Menu';

class App extends Component {
  state = {
    players: 2,
    isMenuVisible: false,
  };

  onGameReset = e => {
    e.preventDefault();
    this.props.moves.resetGame();
    this.onMenuToggle(e);
  };

  onMenuToggle = e => {
    e.preventDefault();
    this.setState(state => ({
      isMenuVisible: !state.isMenuVisible,
    }));
  };

  onPass = () => {
    this.props.moves.pass();
    this.props.events.endTurn();
  };

  render() {
    const { ...rest } = this.props;
    const { isMenuVisible } = this.state;

    return (
      <View style={styles.root}>
        <View style={styles.board}>
          <Board {...rest} />
        </View>
        <View style={styles.sidebar}>
          {/* <Sidebar
            ctx={this.props.ctx}
            players={this.props.G.players}
            onMenuToggle={this.onMenuToggle}
            onPass={this.onPass}
          /> */}
        </View>
        {/* {isMenuVisible && (
          // <Menu
          //   onMenuToggle={this.onMenuToggle}
          //   onGameReset={this.onGameReset}
          // />
        )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {},
  board: {},
  sidebar: {
    position: 'fixed',
    top: '8px',
    right: '8px',
    bottom: '8px',
    width: '220px',
  },
});

export default App;
