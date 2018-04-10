import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Board from './Board';

class Table extends Component {
  state = {
    zoomScale: 1,
  };

  render() {
    const { style, ...rest } = this.props;
    const { isMenuVisible } = this.state;

    return (
      <ScrollView style={[styles.root, style]}>
        <ImageBackground
          source={require('./artwork/matchimals-native-background.png')}
          style={styles.root}
        >
          <Board {...rest} />
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: 3000, // 30
    height: 2800, // 20
  },
});

export default Table;
