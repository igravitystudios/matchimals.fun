import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-jss';
import { Client as BGClient } from 'boardgame.io/client';

import App from './App';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

import './reset.css';
import './index.css';

const Client = BGClient({
  board: App,
  game: Game,
  multiplayer: { server: 'localhost:3333' },
  numPlayers: 2,
  debug: false,
});

ReactDOM.render(
  <ThemeProvider theme={{}}>
    <div>
      <Client gameID="default" playerID="0" />
    </div>
  </ThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
