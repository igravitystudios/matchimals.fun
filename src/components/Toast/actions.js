import React from 'react';
import { render } from 'react-dom';
import Toast from './';

const domId = 'toast';
let dom = document.getElementById(domId);

if (!dom) {
  dom = document.createElement('div');
  dom.id = domId;
  document.body.appendChild(dom);
}

/* Default toast dispatch action, takes a message and renders to the dom */
export default message => {
  render(<Toast>{message}</Toast>, dom);
};
