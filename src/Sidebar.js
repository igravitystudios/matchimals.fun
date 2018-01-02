import React from 'react';
import withStyles from 'react-jss';

import Button from './components/Button';
import Deck from './components/Deck';

const Sidebar = ({ classes, ctx, deck, onPass }) => (
  <div className={classes.root}>
    <div className={classes.logo}>Zoozle</div>
    <div>
      <div>Player {parseInt(ctx.currentPlayer, 10) + 1}</div>
      <div>
        <Deck cards={deck} />
      </div>
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
    padding: '8px',
  },
  logo: {
    width: '100%',
  },
  button: {
    marginTop: 'auto',
  },
})(Sidebar);
