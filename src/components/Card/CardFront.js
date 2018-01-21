import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'react-jss';

import animals from '../../constants/animals';

const CardFront = ({ card, classes, className }) => (
  <div className={classNames(classes.root, className)}>
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 140"
    >
      <polygon
        id="top"
        points="50 70 100 0 0 0 50 70"
        fill={animals[card.top] && animals[card.top].color}
      />
      <polygon
        id="right"
        points="50 70 100 140 100 0 50 70"
        fill={animals[card.right] && animals[card.right].color}
      />
      <polygon
        id="bottom"
        points="50 70 0 140 100 140 50 70"
        fill={animals[card.bottom] && animals[card.bottom].color}
      />
      <polygon
        id="left"
        points="50 70 0 0 0 140 50 70"
        fill={animals[card.left] && animals[card.left].color}
      />
    </svg>
    {animals[card.top] && (
      <div
        style={{
          position: 'absolute',
          top: -32,
          left: 18,
          width: 64,
          height: 64,
        }}
      >
        {animals[card.top].icon}
      </div>
    )}
    {animals[card.right] && (
      <div
        style={{
          position: 'absolute',
          top: 38,
          right: -32,
          width: 64,
          height: 64,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '14px',
            width: '20px',
            color: '#fff',
            fontSize: '14px',
            textAlign: 'center',
            userSelect: 'none',
            textShadow: '1px 1px 0 rgba(41,26,19,0.69)',
          }}
        >
          {animals[card.right].score}
        </div>
        {animals[card.right].icon}
      </div>
    )}
    {animals[card.bottom] && (
      <div
        style={{
          position: 'absolute',
          bottom: '-32px',
          left: 18,
          width: '64px',
          height: '64px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-16px',
            left: '22px',
            width: '20px',
            color: '#fff',
            fontSize: '14px',
            textAlign: 'center',
            userSelect: 'none',
            textShadow: '1px 1px 0 rgba(41,26,19,0.69)',
          }}
        >
          {animals[card.bottom].score}
        </div>
        {animals[card.bottom].icon}
      </div>
    )}
    {animals[card.left] && (
      <div
        style={{
          position: 'absolute',
          top: 38,
          left: -32,
          width: 64,
          height: 64,
        }}
      >
        {animals[card.left].icon}
      </div>
    )}
  </div>
);

CardFront.defaultProps = {
  card: {},
};

CardFront.propTypes = {
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
  },
})(CardFront);
