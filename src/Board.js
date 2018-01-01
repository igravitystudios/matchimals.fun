import React from 'react';
import { isLegalMove } from './Game';
import Button from './components/Button';
import Card from './components/Card';
import Deck from './components/Deck';
import data from './data';

class Board extends React.Component {
  onPass = () => {
    this.props.moves.pass();
    this.props.endTurn();
  };

  onClick(id) {
    // TODO: Fix up `isLegalMove` to be easier/cleaner to call
    if (isLegalMove(this.props.G.cells, id, this.props.G.deck[0])) {
      this.props.moves.clickCell(id);
      this.props.endTurn();
    }
  }

  render() {
    let winner = '';
    if (this.props.ctx.winner !== null) {
      winner = <div>Winner: {this.props.ctx.winner}</div>;
    }

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
      //width?
      let cells = [];
      for (let j = 0; j < data.height; j++) {
        //height?
        const id = data.width * i + j;
        const value = this.props.G.cells[id];
        cells.push(
          <div key={id} className="cell" onClick={() => this.onClick(id)}>
            <div style={cellStyle}>
              {value && <Card card={value} flipped />}
            </div>
          </div>
        );
      }
      board.push(
        <div key={i} className="row">
          {cells}
        </div>
      );
    }
    return (
      <div style={{ display: 'flex' }}>
        <div id="board">{board}</div>
        <div>Player {parseInt(this.props.ctx.currentPlayer, 10) + 1}</div>
        {<Deck cards={this.props.G.deck} />}
        <Button onClick={this.onPass}>Pass</Button>
        {winner}
      </div>
    );
  }
}

export default Board;
