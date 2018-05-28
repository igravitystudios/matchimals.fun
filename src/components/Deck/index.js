import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Card from '../Card';

const Deck = ({ cards, ...rest }) => (
  <View {...rest}>
    {cards.map((card, i) => (
      <Card
        key={i}
        card={card}
        flipped={i === 0}
        style={{
          position: 'absolute',
          left: i * -3,
          top: 0,
          zIndex: -i,
        }}
        disabled={i !== 0}
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
