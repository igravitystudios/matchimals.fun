import React from 'react';
import withStyles from 'react-jss';

import Card from './components/Card';
import { isLegalMove } from './Game';
import { center, height, width } from './constants/board';

class Board extends React.Component {
  componentDidMount() {
    this.centerCard.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  onClick(id) {
    const { G, ctx, game, moves } = this.props;

    if (isLegalMove(G, ctx, id)) {
      moves.clickCell(id);
      game.endTurn();
    }
  }

  render() {
    const { classes, G } = this.props;

    let cells = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const id = width * i + j;
        const value = G.cells[id];
        cells.push(
          <div
            key={id}
            ref={
              id === center
                ? card => {
                    this.centerCard = card;
                  }
                : null
            }
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
