import React from 'react';
import classNames from 'classnames';
import withStyles from 'react-jss';

import Logo from '../Logo';

const CardBack = ({ classes, className }) => (
  <div className={classNames(classes.root, className)}>
    <div className={classes.logo}>
      <Logo width="80" fill="#9F9FB7" />
    </div>
  </div>
);

export default withStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='64' viewBox='0 0 48 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M48 28v-4L36 12 24 24 12 12 0 24v4l4 4-4 4v4l12 12 12-12 12 12 12-12v-4l-4-4 4-4zM8 32l-6-6 10-10 10 10-6 6 6 6-10 10L2 38l6-6zm12 0l4-4 4 4-4 4-4-4zm12 0l-6-6 10-10 10 10-6 6 6 6-10 10-10-10 6-6zM0 16L10 6 4 0h4l4 4 4-4h4l-6 6 10 10L34 6l-6-6h4l4 4 4-4h4l-6 6 10 10v4L36 8 24 20 12 8 0 20v-4zm0 32l10 10-6 6h4l4-4 4 4h4l-6-6 10-10 10 10-6 6h4l4-4 4 4h4l-6-6 10-10v-4L36 56 24 44 12 56 0 44v4z' fill='%239F9FB7' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    backgroundPosition: '2px',
  },
  logo: {
    backgroundColor: '#eee',
    borderRadius: '100%',
  },
})(CardBack);
