import React from 'react';
import classNames from 'classnames';
import withStyles from 'react-jss';

const Button = ({ children, classes, className, onClick, ...props }) => (
  <button className={classNames(classes.root, className)} onClick={onClick}>
    <span className={classes.buttonChildren}>{children}</span>
  </button>
);

export default withStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#D86060',
    borderRadius: '4px',
  },
  buttonChildren: {
    width: '100%',
    textAlign: 'center',
    fontSize: '32px',
    color: '#fafafa',
    padding: '16px',
  },
})(Button);
