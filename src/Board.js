import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Card from './components/Card';
import {
  boardHeight,
  boardWidth,
  cardHeight,
  cardWidth,
  columns,
  rows,
} from './constants/board';

class Board extends Component {
  render() {
    const { G } = this.props;
    let cells = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const id = columns * i + j;
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
    width: boardWidth,
    height: boardHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: cardWidth,
    height: cardHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
  },
});

export default Board;
