import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

const Deck = ({ cards }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-flex',
    }}
  >
    {cards.map((card, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: i * 2,
          left: i * 2,
          zIndex: -i,
        }}
      >
        <Card card={card} />
      </div>
    ))}
  </div>
);

Deck.defaultProps = {
  cards: [],
};

Deck.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  cards: PropTypes.array.isRequired,
};

export default Deck;
