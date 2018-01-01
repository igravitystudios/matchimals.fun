import BGClient from 'boardgame.io/client';

import Game from './Game';
import Board from './Board';

const Client = BGClient({
  game: Game,
  board: Board,
  debug: true,
});

export default Client;
