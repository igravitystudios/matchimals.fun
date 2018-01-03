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
    this.props.endTurn();
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
            deck={this.props.G.deck}
            onPass={this.onPass}
          />
        </div>
      </div>
    );
  }
}

export default withStyles({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  board: {
    width: 'calc(100% - 200px)',
  },
  sidebar: {
    width: '200px',
    height: '100%',
  },
})(App);
