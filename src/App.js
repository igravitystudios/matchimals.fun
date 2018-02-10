import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Orientation from 'react-native-orientation';

import { deck } from './constants/cards';
import Card from './components/Card';
// import Board from './Board';
// import Sidebar from './Sidebar';
// import Menu from './Menu';

class App extends Component {
  state = {
    players: 2,
    isMenuVisible: false,
  };

  componentDidMount() {
    Orientation.lockToLandscape();
  }

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
    const { isMenuVisible } = this.state;

    return (
      <View style={styles.root}>
        {deck.map((card, i) => <Card key={i} card={card} flipped />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default App;
