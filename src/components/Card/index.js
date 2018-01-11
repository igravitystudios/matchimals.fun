import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import classNames from 'classnames';

import CardBack from './CardBack';
import CardFront from './CardFront';

const Card = ({
  card,
  classes,
  className,
  flipped,
  height,
  style,
  width,
  ...props
}) => (
  <div
    className={classNames(classes.root, className)}
    style={{
      width,
      height,
      ...style,
    }}
    {...props}
  >
    {!flipped ? <CardBack /> : <CardFront card={card} />}
  </div>
);

Card.defaultProps = {
  width: 100,
  height: 140,
  card: {},
};

Card.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  card: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
  }).isRequired,
};

export default withStyles({
  root: {
    position: 'relative',
    display: 'inline-flex',
    background: '#ccc',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0px 2px 3px rgba(0,0,0,0.18)',
  },
})(Card);
