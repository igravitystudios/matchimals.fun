import React from 'react';
import withStyles from 'react-jss';

import Logo from './components/Logo';
import Button from './components/Button';
import Deck from './components/Deck';

const Sidebar = ({ classes, ctx, deck, onPass }) => (
  <div className={classes.root}>
    <div className={classes.logo}>
      <Logo />
      <span className={classes.tagline}>
        An animal matching puzzle card game
      </span>
    </div>
    <div className={classes.player}>
      <div className={classes.playerText}>
        Player {parseInt(ctx.currentPlayer, 10) + 1}
      </div>
      <Deck cards={deck} />
    </div>
    <Button className={classes.button} onClick={onPass}>
      Pass
    </Button>
    {ctx.winner && <div>Winner: {ctx.winner}</div>}
  </div>
);

export default withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '16px',
    borderLeft: '1px solid black',
  },
  logo: {
    width: '100%',
    color: '#292929',
    textAlign: 'center',
    marginBottom: '24px',
  },
  playerText: {
    color: '#292929',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '500',
    marginBottom: '6px',
  },
  button: {
    marginTop: 'auto',
  },
})(Sidebar);
