import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
// import Development from './Development';
import { ThemeProvider } from 'react-jss';
import Client from './Client';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ThemeProvider theme={{}}>
    <Client />
  </ThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
