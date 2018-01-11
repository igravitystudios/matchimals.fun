import React from 'react';
import withStyles from 'react-jss';
// import woodBackground from './artwork/wood-background.jpg';

import Card from './components/Card';
import { isLegalMove } from './Game';
import data from './data';

class Board extends React.Component {
  onClick(id) {
    // TODO: Fix up `isLegalMove` to be easier/cleaner to call,
    //       maybe just pass it the `id` and `G`?
    if (isLegalMove(this.props.G.cells, id, this.props.G.deck[0])) {
      this.props.moves.clickCell(id);
      this.props.endTurn();
    }
  }

  render() {
    const { classes } = this.props;

    let cells = [];
    for (let i = 0; i < data.width; i++) {
      for (let j = 0; j < data.height; j++) {
        const id = data.width * i + j;
        const value = this.props.G.cells[id];
        cells.push(
          <div
            key={id}
            className={classes.cell}
            onClick={() => this.onClick(id)}
          >
            {value && <Card card={value} flipped />}
          </div>
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
    gridTemplateColumns: `repeat(${data.width}, 100px)`,
    gridTemplateRows: `repeat(${data.height}, 140px)`,
    gridGap: '0',
  },
  cell: {
    width: '100px',
    height: '140px',
    textAlign: 'center',
    // border: '1px dotted white',
    outline: '2px dashed rgba(255, 255, 255, 0.2)',
    outlineOffset: '-4px',
    borderRadius: '8px',
  },
})(Board);
