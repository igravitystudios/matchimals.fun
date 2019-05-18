import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../Card";

const Deck = ({ cards, onCardDrop, style, ...rest }) => (
  <View style={[styles.root, style]} {...rest}>
    {cards.map((card, i) => {
      let shadow;
      if (i !== 0) {
        shadow = {
          // Shadow props were causing performance issues- let's use a solid border instead of a white shadow
          borderLeftWidth: 1,
          borderLeftColor: "#fff",
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
            left: i === 0 ? 0 : i * 4 + 100,
            top: 0,
            ...shadow,
          }}
          disabled={i !== 0}
        />
      );
    })}
  </View>
);

Deck.defaultProps = {
  cards: [],
};

const styles = StyleSheet.create({
  root: {
    position: "absolute",
  },
});

export default Deck;
