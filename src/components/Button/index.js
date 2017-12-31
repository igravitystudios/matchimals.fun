import React from 'react';
import classNames from 'classnames';
import withStyles from 'react-jss';

const Button = ({ children, classes, className, onClick, ...props }) => (
  <button className={classNames(classes.root, className)} onClick={onClick}>
    {children}
  </button>
);

export default withStyles({
  root: {
    display: 'inline-flex',
    background: 'red',
  },
})(Button);
