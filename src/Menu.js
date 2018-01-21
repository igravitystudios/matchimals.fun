import React from 'react';
import withStyles from 'react-jss';

import Button from './components/Button';

const Menu = ({ classes, onMenuToggle, onGameReset }) => (
  <div className={classes.root}>
    <Button className={classes.menu} onClick={onGameReset}>
      Reset Game
    </Button>
    <Button color="grayLight" className={classes.menu} onClick={onMenuToggle}>
      Back to game
    </Button>
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
    overflowY: 'auto',
  },
  menu: {
    margin: '8px',
  },
})(Menu);
