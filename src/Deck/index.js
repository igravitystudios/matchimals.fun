import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../Card";

const Deck = ({ cards = [], onCardDrop, style, ...rest }) => (
  <View style={[styles.root, style]} {...rest}>
    {cards.map((card, i) => {
      let shadow;
      if (i !== 0) {
        shadow = {
          // Shadow props were causing performance issues- let's use a solid border instead of a white shadow
          borderRightWidth: 1,
          borderRightColor: "#2A1A12", // shadow from new logo
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
            left: i === 0 ? 0 : i * 3,
            top: 0,
            ...shadow,
            zIndex: 100 - i,
          }}
          disabled={i !== 0}
        />
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  root: {
    position: "absolute",
  },
});

export default Deck;
