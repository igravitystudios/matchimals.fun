import React, { Component } from 'react';
import withStyles from 'react-jss';

import Board from './Board';
import Sidebar from './Sidebar';
import Menu from './Menu';

class App extends Component {
  state = {
    players: 2,
    isMenuVisible: false,
  };

  onGameReset = e => {
    e.preventDefault();
    this.props.moves.resetGame();
    this.onMenuToggle(e);
  };

  onMenuToggle = e => {
    e.preventDefault();
    this.setState(state => ({
      isMenuVisible: !state.isMenuVisible,
    }));
  };

  onPass = () => {
    this.props.moves.pass();
    this.props.events.endTurn();
  };

  render() {
    const { classes, ...rest } = this.props;
    const { isMenuVisible } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.board}>
          <Board {...rest} />
        </div>
        <div className={classes.sidebar}>
          <Sidebar
            ctx={this.props.ctx}
            players={this.props.G.players}
            onMenuToggle={this.onMenuToggle}
            onPass={this.onPass}
          />
        </div>
        {isMenuVisible && (
          <Menu
            onMenuToggle={this.onMenuToggle}
            onGameReset={this.onGameReset}
          />
        )}
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
