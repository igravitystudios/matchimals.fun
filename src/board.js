import React from 'react';
import Card from './components/Card';
import Deck from './components/Deck';
import data from './data';

class BusyBeeBoard extends React.Component {
  onPass = () => {
    this.props.moves.pass();
    this.props.endTurn();
  };
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.endTurn();
    }
  }

  isActive(id) {
    if (this.props.ctx.winner !== null) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
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
      <div>
        <div id="board">{board}</div>
        <div>Player {parseInt(this.props.ctx.currentPlayer, 10) + 1}</div>
        {<Deck cards={this.props.G.deck} />}
        <button onClick={this.onPass}>Pass</button>
        {winner}
      </div>
    );
  }
}

export default BusyBeeBoard;
