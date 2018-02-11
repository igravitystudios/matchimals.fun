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
import Deck from './components/Deck';
import Button from './components/Button';
import MenuButton from './components/MenuButton';
// import Board from './Board';
// import Sidebar from './Sidebar';
import Menu from './Menu';

class App extends Component {
  state = {
    players: 2,
    isMenuVisible: false,
    zoomScale: 1,
  };

  componentDidMount() {
    Orientation.lockToLandscape();

    this.scrollToCenter();
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

  onScroll = e => {
    const newZoomScale = e.nativeEvent.zoomScale;
    this.setState({
      zoomScale: newZoomScale,
    });
  };

  scrollToCenter = () => {
    const { zoomScale } = this.state;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const left = (3000 * zoomScale - width) / 2;
    const top = (2800 * zoomScale - height) / 2;
    this.scrollView.scrollTo({ x: left, y: top, animated: true });
  };

  render() {
    const { isMenuVisible, zoomScale } = this.state;

    return (
      <View style={styles.root}>
        <StatusBar hidden />
        <ScrollView
          ref={view => {
            this.scrollView = view;
          }}
          bounces={false}
          bouncesZoom={false}
          contentContainerStyle={[styles.root, styles.board]}
          minimumZoomScale={0.6}
          maximumZoomScale={1.8}
          onScroll={this.onScroll}
          scrollEventThrottle={0}
        >
          <ImageBackground
            source={require('./artwork/matchimals-native-background.png')}
            style={styles.board}
          >
            <Card
              card={deck[0]}
              flipped
              style={{ top: 1330, left: 1450 }} // Board center
              disabled
            />
          </ImageBackground>
        </ScrollView>
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
        <MenuButton
          onPress={this.scrollToCenter}
          style={{
            position: 'absolute',
            bottom: 16,
            right: 96,
          }}
        >
          ⊕
        </MenuButton>
        <MenuButton
          onPress={this.onMenuToggle}
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          ?
        </MenuButton>
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
