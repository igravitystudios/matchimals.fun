import React, { Component } from 'react';
import withStyles from 'react-jss';
// import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Board from './Board';
import Sidebar from './Sidebar';
import Menu from './Menu';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: 2,
      isMenuVisible: false,
      initialCtx: props.ctx,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ctx.gameover) {
      this.setState(() => ({
        isMenuVisible: true,
      }));
    }
  }

  onGameReset = e => {
    e.preventDefault();

    // Couldn't get boardgame.io's restore action working properly
    // Ideal situation is to use `this.props.restore` and pass it
    // a fresh game state + `this.state.initialCtx` –
    // not sure why it wasn't working properly.
    window.location.reload();
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
            winner={this.props.ctx.gameover}
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
})(DragDropContext(HTML5Backend)(App));
