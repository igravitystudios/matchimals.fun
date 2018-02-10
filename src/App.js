import React, { Component, Fragment } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation';

import { deck } from './constants/cards';
import Card from './components/Card';
import CircleButton from './components/CircleButton';
// import Board from './Board';
// import Sidebar from './Sidebar';
import Menu from './Menu';

class App extends Component {
  state = {
    players: 2,
    isMenuVisible: false,
  };

  componentDidMount() {
    Orientation.lockToLandscape();
  }

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
    this.setState(state => ({
      isMenuVisible: !state.isMenuVisible,
    }));
  };

  render() {
    const { isMenuVisible } = this.state;

    return (
      <Fragment>
        <StatusBar hidden />
        <ImageBackground
          source={require('./artwork/wood-background-2048×1536.png')}
          style={[styles.root, { width, height }]}
        >
          {deck.map((card, i) => <Card key={i} card={card} flipped />)}
          <Text style={styles.dimbo}>Matchimals</Text>
          <CircleButton
            onPress={this.onMenuToggle}
            style={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            ?
          </CircleButton>
        </ImageBackground>
        {isMenuVisible && (
          <Menu
            onGameReset={this.onGameReset}
            onMenuToggle={this.onMenuToggle}
          />
        )}
      </Fragment>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width,
    height,
  },
});

export default App;
