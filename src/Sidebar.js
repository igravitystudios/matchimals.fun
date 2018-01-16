import React from 'react';
import withStyles from 'react-jss';
import classNames from 'classnames';

import Logo from './components/Logo';
import Button from './components/Button';
import Deck from './components/Deck';

const Sidebar = ({ classes, ctx, players, onMenuToggle, onPass }) => (
  <div className={classes.root}>
    <div className={classes.logo}>
      <Logo className={classes.logoMark} />
      <div className={classes.tagline}>An animal matching puzzle card game</div>
    </div>
    {Object.keys(players).map(player => {
      const isPlayerActive = player === ctx.currentPlayer;
      return (
        <div
          key={player}
          className={classNames(
            classes.player,
            isPlayerActive && classes.playerActive
          )}
        >
          <div className={classes.playerText}>
            Player {parseInt(player, 10) + 1}
          </div>
          <Deck cards={players[player].deck} flipped={isPlayerActive} />
        </div>
      );
    })}
    <Button className={classes.pass} onClick={onPass}>
      Pass
    </Button>
    <Button color="grayLight" className={classes.menu} onClick={onMenuToggle}>
      Menu
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
    backgroundColor: 'rgba(41,26,19,0.420)',
    borderRadius: '8px',
    padding: '8px',
    overflowY: 'auto',
  },
  logo: {
    marginBottom: '24px',
  },
  logoMark: {
    padding: '8px',
    filter: 'drop-shadow(1px 1px 0 rgba(41,26,19,0.420))',
  },
  tagline: {
    fontSize: '18px',
    lineHeight: '21px',
    color: '#fafafa',
    textAlign: 'center',
    padding: '0 16px',
  },
  player: {
    marginBottom: '24px',
    transition: 'all 0.3s ease-in-out',
    transformOrigin: 'top left',
    transform: 'scale(0.75)',
  },
  playerActive: {
    transform: 'scale(1)',
  },
  playerText: {
    color: '#fafafa',
    fontSize: '24px',
    lineHeight: '32px',
    marginBottom: '6px',
    textDecoration: 'underline',
    textDecorationSkip: 'ink', // this may become `text-decoration-skip-ink: auto;` in the future? Regardless, it's a hot effect. 🔥🔥🔥 https://css-tricks.com/almanac/properties/t/text-decoration-skip/
  },
  pass: {
    marginTop: 'auto',
  },
  menu: {
    marginTop: '8px',
  },
})(Sidebar);
