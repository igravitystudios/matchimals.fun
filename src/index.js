import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-jss';
import { Client as BGClient } from 'boardgame.io/client';

import App from './App';
import Game from './Game';
// import registerServiceWorker from './registerServiceWorker';

import './reset.css';
import './index.css';

const Client = BGClient({
  board: App,
  game: Game,
  numPlayers: 2,
  debug: false,
});

ReactDOM.render(
  <ThemeProvider theme={{}}>
    <Client />
  </ThemeProvider>,
  document.getElementById('root')
);

// registerServiceWorker();
