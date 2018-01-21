import React from 'react';
import { View, StyleSheet } from 'react-native';

// import Card from './components/Card';
import { isLegalMove } from './Game';
import { center, height, width } from './constants/board';

class Board extends React.Component {
  onClick(id) {
    const { G, ctx, events, moves } = this.props;

    if (isLegalMove(G, ctx, id)) {
      moves.clickCell(id);
      events.endTurn();
    }
  }

  render() {
    // const { G } = this.props;

    let cells = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const id = width * i + j;
        // const value = G.cells[id];
        cells.push(
          <View key={id} style={styles.cell}>
            {/* {value && <Card card={value} flipped />} */}
          </View>
        );
      }
    }

    return <View style={styles.root}>{cells}</View>;
  }
}

const styles = StyleSheet.create({
  root: {
    minWidth: '1536px', // 100 * 13 (gameboard) + 220 (sidebar) + 16 (padding)
    minHeight: '1820px',
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 100px)`,
    gridTemplateRows: `repeat(${height}, 140px)`,
    gridGap: '0',
  },
  cell: {
    width: '100px',
    height: '140px',
    textAlign: 'center',
    outline: '2px dashed rgba(255, 255, 255, 0.2)',
    outlineOffset: '-4px',
    borderRadius: '8px',
  },
});

export default Board;
