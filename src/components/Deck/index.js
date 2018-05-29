import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Card from '../Card';

const Deck = ({ cards, style, ...rest }) => (
  <View style={[styles.root, style]} {...rest}>
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

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
});

export default Deck;
