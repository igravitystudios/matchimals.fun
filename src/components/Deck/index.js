import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Card from '../Card';

const Deck = ({ cards, flipped, ...rest }) => (
  <View {...rest}>
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
  </View>
);

Deck.defaultProps = {
  cards: [],
};

Deck.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default Deck;
