import Client from 'boardgame.io/client';

import BusyBee from './game';
import BusyBeeBoard from './board';
import './app.css';

const App = Client({
  game: BusyBee,
  board: BusyBeeBoard,
});

export default App;
