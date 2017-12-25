import React from "react";
import Client from "boardgame.io/client";
import Game from "boardgame.io/game";

import Card from "./Card";
import data from "./data";
import "./App.css";

function IsVictory(cells) {
  // Return true if cells is in a winning configuration.
}

const BusyBee = Game({
  setup: () => ({ cells: data.board }),

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }

      return { ...G, cells };
    }
  },

  victory: (G, ctx) => {
    return IsVictory(G.cells) ? ctx.currentPlayer : null;
  }
});

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
    let winner = "";
    if (this.props.ctx.winner !== null) {
      winner = <div>Winner: {this.props.ctx.winner}</div>;
    }

    const cellStyle = {
      display: "inline-block",
      width: "50px",
      height: "70px",
      textAlign: "center",
      background: "lightgray",
      border: "1px dotted gray"
    };

    let board = [];
    for (let i = 0; i < 12; i++) {
      let cells = [];
      for (let j = 0; j < 12; j++) {
        const id = 12 * i + j;
        cells.push(
          <div key={id} className="cell" onClick={() => this.onClick(id)}>
            <div style={cellStyle}>
              <Card />
              {/* {this.props.G.cells[id]} */}
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
        <Card
          card={{ top: "sheep", right: "bunny", bottom: "cow", left: "owl" }}
        />
        <div id="board">{board}</div>
        {winner}
      </div>
    );
  }
}

const App = Client({
  game: BusyBee,
  board: BusyBeeBoard
});

export default App;
