import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import data from '../../data';

const CardFront = ({ width, height, card }) => (
  <Fragment>
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
          top: -32,
          left: 18,
          width: 64,
          height: 64,
          backgroundImage: `url(${data.cards[card.top].image})`,
          backgroundSize: '64px 64px',
        }}
      />
    )}
    {data.cards[card.right] && (
      <div
        style={{
          position: 'absolute',
          top: 38,
          right: -32,
          width: 64,
          height: 64,
          backgroundImage: `url(${data.cards[card.right].image})`,
          backgroundSize: '64px 64px',
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
            fontWeight: '700',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          {data.cards[card.right].value}
        </div>
      </div>
    )}
    {data.cards[card.bottom] && (
      <div
        style={{
          position: 'absolute',
          bottom: '-32px',
          left: 18,
          width: '64px',
          height: '64px',
          backgroundImage: `url(${data.cards[card.bottom].image})`,
          backgroundSize: '64px 64px',
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
            fontWeight: '700',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          {data.cards[card.bottom].value}
        </div>
      </div>
    )}
    {data.cards[card.left] && (
      <div
        style={{
          position: 'absolute',
          top: 38,
          left: -32,
          width: 64,
          height: 64,
          backgroundImage: `url(${data.cards[card.left].image})`,
          backgroundSize: '64px 64px',
        }}
      />
    )}
  </Fragment>
);

const CardBack = ({ width, height }) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 140"
  >
    <polygon id="top" points="50 70 100 0 0 0 50 70" fill="blue" />
    <polygon id="right" points="50 70 100 140 100 0 50 70" fill="black" />
    <polygon id="bottom" points="50 70 0 140 100 140 50 70" fill="blue" />
    <polygon id="left" points="50 70 0 0 0 140 50 70" fill="black" />
  </svg>
);

const Card = ({ flipped, style, ...props }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-flex',
      overflow: 'hidden',
      borderRadius: 4,
      boxShadow: '0px 2px 3px rgba(0,0,0,0.2)',
      ...style,
    }}
  >
    {!flipped ? <CardBack {...props} /> : <CardFront {...props} />}
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

export default Card;
