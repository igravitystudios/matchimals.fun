import React from 'react';
import PropTypes from 'prop-types';
import data from './data';

const Card = ({ width, height, card }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-flex',
      overflow: 'hidden',
      borderRadius: 4,
    }}
  >
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 140"
    >
      <polygon
        id="top"
        points="50 70 100 0 0 0 50 70"
        fill={
          (data.animals[card.top] && data.animals[card.top].color) || 'black'
        }
      />
      <polygon
        id="right"
        points="50 70 100 140 100 0 50 70"
        fill={
          (data.animals[card.right] && data.animals[card.right].color) ||
          'black'
        }
      />
      <polygon
        id="bottom"
        points="50 70 0 140 100 140 50 70"
        fill={
          (data.animals[card.bottom] && data.animals[card.bottom].color) ||
          'black'
        }
      />
      <polygon
        id="left"
        points="50 70 0 0 0 140 50 70"
        fill={
          (data.animals[card.left] && data.animals[card.left].color) || 'black'
        }
      />
    </svg>
    {data.animals[card.top] && (
      <div
        style={{
          position: 'absolute',
          top: -16,
          left: 9,
          width: 32,
          height: 32,
          backgroundImage: `url(${data.animals[card.top].image || null})`,
          backgroundSize: '32px 32px',
        }}
      />
    )}
    {data.animals[card.right] && (
      <div
        style={{
          position: 'absolute',
          top: 19,
          right: -16,
          width: 32,
          height: 32,
          backgroundImage: `url(${data.animals[card.right].image})`,
          backgroundSize: '32px 32px',
        }}
      />
    )}
    {data.animals[card.bottom] && (
      <div
        style={{
          position: 'absolute',
          bottom: -16,
          left: 9,
          width: 32,
          height: 32,
          backgroundImage: `url(${data.animals[card.bottom].image})`,
          backgroundSize: '32px 32px',
        }}
      />
    )}
    {data.animals[card.left] && (
      <div
        style={{
          position: 'absolute',
          top: 19,
          left: -16,
          width: 32,
          height: 32,
          backgroundImage: `url(${data.animals[card.left].image})`,
          backgroundSize: '32px 32px',
        }}
      />
    )}
  </div>
);

Card.defaultProps = {
  width: 50,
  height: 70,
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

export default Card;
