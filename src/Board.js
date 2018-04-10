import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Card from './components/Card';
import { isLegalMove } from './Game';
import { height, width } from './constants/board';

class Board extends Component {
  render() {
    const { G } = this.props;
    let cells = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
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
    minWidth: 3000, // 30
    minHeight: 2800, // 20
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 100,
    height: 140,
    // outline: '2px dashed rgba(255, 255, 255, 0.1)',
    // outlineOffset: '-4px',
    // borderRadius: '8px',
  },
});

export default Board;
