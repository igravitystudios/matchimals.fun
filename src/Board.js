import React, { Component } from 'react';
import withStyles from 'react-jss';

import Card from './components/Card';
import Cell from './components/Cell';
import { isLegalMove } from './Game';
import { height, width } from './constants/board';

class Board extends Component {
  onClick = id => {
    const { G, ctx, events, moves } = this.props;
    const cells = [...G.cells];
    if (cells[id] === null) {
      if (isLegalMove(G, ctx, id)) {
        moves.clickCell(id);
        events.endTurn();
      }
    }
  };

  render() {
    const { classes, G } = this.props;
    let cells = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const id = width * i + j;
        const value = G.cells[id];
        cells.push(
          <Cell
            key={id}
            id={id}
            className={classes.cell}
            onClick={this.onClick}
          >
            {value && <Card card={value} flipped />}
          </Cell>
        );
      }
    }

    return <div className={classes.root}>{cells}</div>;
  }
}

export default withStyles({
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
})(Board);
