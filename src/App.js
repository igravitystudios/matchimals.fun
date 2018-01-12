import React, { Component } from 'react';
import withStyles from 'react-jss';

import Board from './Board';
import Sidebar from './Sidebar';

class App extends Component {
  state = {
    players: 2,
  };

  onPass = () => {
    this.props.moves.pass();
    this.props.game.endTurn();
  };

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.board}>
          <Board {...rest} />
        </div>
        <div className={classes.sidebar}>
          <Sidebar
            ctx={this.props.ctx}
            players={this.props.G.players}
            onPass={this.onPass}
          />
        </div>
      </div>
    );
  }
}

export default withStyles({
  root: {},
  board: {},
  sidebar: {
    position: 'fixed',
    top: '8px',
    right: '8px',
    bottom: '8px',
    width: '220px',
  },
})(App);
