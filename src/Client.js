import BoardGameClient from 'boardgame.io/client';

import BusyBee from './game';
import BusyBeeBoard from './board';
import './app.css';

const Client = BoardGameClient({
  game: BusyBee,
  board: BusyBeeBoard,
  debug: false
});

export default Client;
