import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

const Deck = ({ cards, flipped }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-flex',
      zIndex: '101',
    }}
  >
    {cards.map((card, i) => (
      <Card
        key={i}
        card={card}
        flipped={i === 0 && flipped}
        style={{
          position: i ? 'absolute' : 'inherit',
          left: i,
          zIndex: -i,
        }}
      />
    ))}
  </div>
);

Deck.defaultProps = {
  cards: [],
};

Deck.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default Deck;
