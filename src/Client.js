import BoardGameClient from 'boardgame.io/client';

import Game from './game';
import Board from './board';

const Client = BoardGameClient({
  game: Game,
  board: Board,
  debug: true,
});

export default Client;
