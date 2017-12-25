import React from 'react';
import PropTypes from 'prop-types';
import data from './data';

const Card = ({ width, height, card }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-flex',
      overflow: 'hidden',
      borderRadius: 2,
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
        fill={data.cards[card.top] && data.cards[card.top].color}
      />
      <polygon
        id="right"
        points="50 70 100 140 100 0 50 70"
        fill={data.cards[card.right] && data.cards[card.right].color}
      />
      <polygon
        id="bottom"
        points="50 70 0 140 100 140 50 70"
        fill={data.cards[card.bottom] && data.cards[card.bottom].color}
      />
      <polygon
        id="left"
        points="50 70 0 0 0 140 50 70"
        fill={data.cards[card.left] && data.cards[card.left].color}
      />
    </svg>
    {data.cards[card.top] && (
      <div
        style={{
          position: 'absolute',
          top: -16,
          left: 9,
          width: 32,
          height: 32,
          backgroundImage: `url(${data.cards[card.top].image || null})`,
          backgroundSize: '32px 32px',
        }}
      />
    )}
    {data.cards[card.right] && (
      <div
        style={{
          position: 'absolute',
          top: 19,
          right: -16,
          width: 32,
          height: 32,
          backgroundImage: `url(${data.cards[card.right].image})`,
          backgroundSize: '32px 32px',
        }}
      />
    )}
    {data.cards[card.bottom] && (
      <div
        style={{
          position: 'absolute',
          bottom: -16,
          left: 9,
          width: 32,
          height: 32,
          backgroundImage: `url(${data.cards[card.bottom].image})`,
          backgroundSize: '32px 32px',
        }}
      />
    )}
    {data.cards[card.left] && (
      <div
        style={{
          position: 'absolute',
          top: 19,
          left: -16,
          width: 32,
          height: 32,
          backgroundImage: `url(${data.cards[card.left].image})`,
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
