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
            players={this.props.G.players}
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
    // width: '100vw',
    // height: '100vh',
    // overflow: 'hidden',
  },
  board: {
    // width: 'calc(100% - 220px)',
    // height: '100%',
    paddingRight: '220px',
    overflow: 'auto',
  },
  sidebar: {
    position: 'fixed',
    top: '0',
    right: '0',
    width: '220px',
    height: '100%',
  },
})(App);
