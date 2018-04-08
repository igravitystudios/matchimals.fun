import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation';

import { deck } from './constants/cards';
import Card from './components/Card';
import Deck from './components/Deck';
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import Table from './Table';
import Menu from './Menu';

class App extends Component {
  state = {
    players: 2,
    isMenuVisible: false,
  };

  componentDidMount() {
    if (Platform.OS !== 'web') {
      Orientation.lockToLandscape();
    }
  }

  onGamePass = () => {
    // this.props.moves.pass();
    // this.props.events.endTurn();
  };

  onGameReset = () => {
    // e.preventDefault();
    // this.props.moves.resetGame();
    this.onMenuToggle();
  };

  onMenuToggle = () => {
    this.setState(state => ({
      isMenuVisible: !state.isMenuVisible,
    }));
  };

  onScrollToCenter = () => {
    console.log(this.table);
    this.table.scrollToCenter();
  };

  render() {
    const { isMenuVisible } = this.state;

    return (
      <View style={styles.root}>
        <StatusBar hidden />
        <Table
          ref={tableComponent => {
            this.table = tableComponent;
          }}
        />
        <Deck
          cards={deck}
          style={{
            position: 'absolute',
            bottom: 156,
            left: 72,
          }}
        />
        <Button
          onPress={this.onGamePass}
          style={{
            position: 'absolute',
            bottom: 16,
            left: 200,
          }}
        >
          PASS
        </Button>
        <CircleButton
          onPress={this.onScrollToCenter}
          style={{
            position: 'absolute',
            bottom: 16,
            right: 96,
          }}
        >
          ⊕
        </CircleButton>
        <CircleButton
          onPress={this.onMenuToggle}
          style={{
            position: 'absolute',
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
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  board: {
    width: 3000, // 30
    height: 2800, // 20
  },
});

export default App;
