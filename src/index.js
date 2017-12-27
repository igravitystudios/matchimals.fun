import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
// import Development from './Development';
import Client from './Client';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Client />, document.getElementById('root'));
registerServiceWorker();
