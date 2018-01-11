import React from 'react';
import withStyles from 'react-jss';

import Logo from './components/Logo';
import Button from './components/Button';
import Deck from './components/Deck';

const Sidebar = ({ classes, ctx, players, onPass }) => (
  <div className={classes.root}>
    <div className={classes.logo}>
      <Logo className={classes.logoMark} />
      <div className={classes.tagline}>An animal matching puzzle card game</div>
    </div>
    <div>Player {parseInt(ctx.currentPlayer, 10) + 1}'s Turn</div>
    {Object.keys(players).map(player => (
      <div key={player} className={classes.player}>
        <div className={classes.playerText}>
          Player {parseInt(player, 10) + 1}
        </div>
        <Deck cards={players[player].deck} />
      </div>
    ))}
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
    backgroundColor: '#333',
    padding: '8px',
    // borderLeft: '1px solid black',
  },
  logo: {
    marginBottom: '24px',
  },
  logoMark: {
    // filter: 'drop-shadow(-1px -1px 2px #fff)',
  },
  tagline: {
    fontSize: '14px',
    lineHeight: '18px',
    color: '#fafafa',
    textAlign: 'center',
    padding: '0 16px',
  },
  player: {
    marginBottom: '50px',
  },
  playerText: {
    color: '#fafafa',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '500',
    marginBottom: '6px',
  },
  button: {
    marginTop: 'auto',
  },
})(Sidebar);
