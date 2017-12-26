import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import Development from './Development';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <Development />
    <App />
  </div>,
  document.getElementById('root')
);
registerServiceWorker();
