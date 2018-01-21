import { AppRegistry } from 'react-native';
import { Client as BGClient } from 'boardgame.io/client';

import App from './src/App';
import Game from './src/Game';

const Client = BGClient({
  board: App,
  game: Game,
  numPlayers: 2,
  debug: false,
});

AppRegistry.registerComponent('matchimals', () => Client);
