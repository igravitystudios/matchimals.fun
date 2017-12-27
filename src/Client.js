import BoardGameClient from 'boardgame.io/client';

import BusyBee from './game';
import BusyBeeBoard from './board';

const Client = BoardGameClient({
  game: BusyBee,
  board: BusyBeeBoard,
  debug: true,
});

export default Client;
