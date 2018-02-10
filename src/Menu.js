import React from 'react';
import classNames from 'classnames';
import withStyles from 'react-jss';
import Confetti from 'react-confetti';

import Button from './components/Button';

const Menu = ({ classes, onMenuToggle, onGameReset, winner }) => (
  <div className={classes.root}>
    {winner && (
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    )}
    {winner && (
      <div className={classes.winner}>
        Player {parseInt(winner, 10) + 1} Wins!
      </div>
    )}
    <Button
      element="a"
      href="https://github.com/chrisheninger/matchimals.fun"
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(classes.menu, classes.github)}
      color="blueMedium"
    >
      View Code on GitHub
    </Button>
    <Button className={classes.menu} onClick={onGameReset}>
      Reset Game
    </Button>
    {!winner && (
      <Button color="grayLight" className={classes.menu} onClick={onMenuToggle}>
        Back to game
      </Button>
    )}
  </div>
);

export default withStyles({
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(20,13,10,0.9)',
    borderRadius: '8px',
    padding: '8px',
    overflow: 'hidden',
  },
  menu: {
    margin: '8px',
  },
  github: {
    marginBottom: '128px',
  },
  winner: {
    fontSize: '48px',
    lineHeight: '60px',
  },
})(Menu);
