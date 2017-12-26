import React from 'react';

class BusyBeeBoard extends React.Component {
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
      width: '50px',
      height: '70px',
      textAlign: 'center',
      background: 'lightgray',
      border: '1px dotted gray',
    };

    let board = [];
    for (let i = 0; i < 12; i++) {
      let cells = [];
      for (let j = 0; j < 12; j++) {
        const id = 12 * i + j;
        cells.push(
          <div key={id} className="cell" onClick={() => this.onClick(id)}>
            <div style={cellStyle}>{this.props.G.cells[id]}</div>
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
        {winner}
      </div>
    );
  }
}

export default BusyBeeBoard;
