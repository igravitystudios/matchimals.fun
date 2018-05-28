import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Card from './components/Card';
import { height, width } from './constants/board';

class Board extends Component {
  render() {
    const { G } = this.props;
    let cells = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const id = width * i + j;
        const value = G.cells[id];
        cells.push(
          <View key={id} id={id} style={styles.cell}>
            {value ? <Card card={value} flipped disabled /> : <Text>{id}</Text>}
          </View>
        );
      }
    }

    return <View style={styles.root}>{cells}</View>;
  }
}

const styles = StyleSheet.create({
  root: {
    width: 3000, // 30
    height: 2800, // 20
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
  },
});

export default Board;
