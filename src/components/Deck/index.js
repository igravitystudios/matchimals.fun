import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Card from '../Card';

const Deck = ({ cards, onScrollToggle, zoomScale, ...rest }) => (
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
          shadowColor: 'rgba(0,0,0,0.420)',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 0,
        }}
        onScrollToggle={onScrollToggle}
        zoomScale={zoomScale}
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
