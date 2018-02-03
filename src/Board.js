import React from 'react';
import withStyles from 'react-jss';

import Card from './components/Card';
import Cell from './components/Cell';
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
    console.log('Re-rendered entire board');
    const { classes, G } = this.props;
    let cells = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const id = width * i + j;
        const value = G.cells[id];
        cells.push(
          <div
            key={id}
            onClick={() => this.onClick(id)}
            ref={
              id === center
                ? card => {
                    this.centerCard = card;
                  }
                : null
            }
          >
            <Cell id={id} className={classes.cell} onClick={this.onClick}>
              {value && <Card card={value} flipped />}
            </Cell>
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
