import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Card from './components/Card';
class Table extends Component {
  state = {
    zoomScale: 1,
  };

  componentDidMount() {
    this.scrollToCenter();
  }

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
    const { contentContainerStyle, style } = this.props;
    const { isMenuVisible } = this.state;

    return (
      <ScrollView
        ref={view => {
          this.scrollView = view;
        }}
        bounces={false}
        bouncesZoom={false}
        style={style}
        contentContainerStyle={[styles.board, contentContainerStyle]}
        minimumZoomScale={0.6}
        maximumZoomScale={1.8}
        onScroll={this.onScroll}
        scrollEventThrottle={1}
      >
        <ImageBackground
          source={require('./artwork/matchimals-native-background.png')}
          style={styles.board}
        >
          {/* <Card
            card={deck[0]}
            flipped
            style={{ top: 1330, left: 1450 }} // Board center
            disabled
          /> */}
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    width: 3000, // 30
    height: 2800, // 20
  },
});

export default Table;
