import React from 'react';
import withStyles from 'react-jss';

import Card from './components/Card';
import { isLegalMove } from './Game';
import data from './data';

class Board extends React.Component {
  onPass = () => {
    this.props.moves.pass();
    this.props.endTurn();
  };

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
    const cellStyle = {
      display: 'inline-block',
      width: '100px',
      height: '140px',
      textAlign: 'center',
      background: 'lightgray',
      border: '1px dotted gray',
    };

    let board = [];
    for (let i = 0; i < data.width; i++) {
      let cells = [];
      for (let j = 0; j < data.height; j++) {
        const id = data.width * i + j;
        const value = this.props.G.cells[id];
        cells.push(
          <div
            key={id}
            className={classes.cell}
            onClick={() => this.onClick(id)}
          >
            <div style={cellStyle}>
              {value && <Card card={value} flipped />}
            </div>
          </div>
        );
      }
      board.push(
        <div key={i} className={classes.row}>
          {cells}
        </div>
      );
    }

    return <div className={classes.root}>{board}</div>;
  }
}

export default withStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
  row: {
    display: 'flex',
  },
  cell: {
    display: 'flex',
  },
})(Board);
