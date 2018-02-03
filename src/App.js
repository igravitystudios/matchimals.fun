import React, { Component, Fragment } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import TouchBackend from 'react-dnd-touch-backend';

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
      <Fragment>
        <Board {...rest} />
        <Sidebar
          ctx={this.props.ctx}
          players={this.props.G.players}
          onMenuToggle={this.onMenuToggle}
          onPass={this.onPass}
          style={{
            position: 'fixed',
            top: '8px',
            right: '8px',
            bottom: '8px',
            width: '220px',
          }}
        />
        {isMenuVisible && (
          <Menu
            winner={this.props.ctx.gameover}
            onMenuToggle={this.onMenuToggle}
            onGameReset={this.onGameReset}
          />
        )}
      </Fragment>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
