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
import MenuButton from './components/MenuButton';
// import Board from './Board';
// import Sidebar from './Sidebar';
import Menu from './Menu';

class App extends Component {
  state = {
    players: 2,
    isMenuVisible: false,
    isScrollEnabled: true,
    zoomScale: 1,
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

  onScrollToggle = () => {
    this.setState(state => ({
      isScrollEnabled: !state.isScrollEnabled,
    }));
  };

  onScroll = e => {
    const newZoomScale = e.nativeEvent.zoomScale;
    this.setState({
      zoomScale: newZoomScale,
    });
  };

  render() {
    const { isMenuVisible, isScrollEnabled, zoomScale } = this.state;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    console.log(this.hmm);

    return (
      <View style={[styles.root, { width, height }]}>
        <StatusBar hidden />
        <ScrollView
          bounces={false}
          bouncesZoom={false}
          contentContainerStyle={[styles.root, styles.board]}
          minimumZoomScale={0.5}
          maximumZoomScale={2}
          onScroll={this.onScroll}
          scrollEnabled={isScrollEnabled}
        >
          <ImageBackground
            source={require('./artwork/wood-background-2048×1536.png')}
            style={styles.board}
          >
            {deck.map((card, i) => (
              <Card
                key={i}
                card={card}
                flipped
                onScrollToggle={this.onScrollToggle}
                zoomScale={zoomScale}
              />
            ))}
          </ImageBackground>
        </ScrollView>
        <MenuButton
          onPress={this.onMenuToggle}
          style={{ position: 'absolute', bottom: 16, right: 16 }}
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
  },
  board: {
    width: 2048,
    height: 1536,
  },
});

export default App;
