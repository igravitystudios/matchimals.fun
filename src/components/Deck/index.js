import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import Card from "../Card";

const Deck = ({ cards, onCardDrop, style, ...rest }) => (
  <View style={[styles.root, style]} {...rest}>
    {cards.map((card, i) => {
      let shadow;
      if (i !== 0) {
        shadow = {
          shadowColor: "#fff",
          shadowOffset: {
            width: -1,
            height: 0,
          },
          shadowOpacity: 0.8,
          shadowRadius: 0,
        };
      }

      return (
        <Card
          key={i}
          card={card}
          onCardDrop={onCardDrop}
          flipped={i === 0}
          style={{
            position: "absolute",
            left: i === 0 ? 0 : i * 6 + 100,
            top: 0,
          }}
          disabled={i !== 0}
          {...shadow}
        />
      );
    })}
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
    position: "absolute",
  },
});

export default Deck;
