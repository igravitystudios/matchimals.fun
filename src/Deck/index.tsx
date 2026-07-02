import React from "react";
import { StyleSheet, View } from "react-native";
import type { ViewProps } from "react-native";

import Card from "../Card";
import type { CardDropMeasurements } from "../Card";
import type { Card as CardType } from "../constants/cards";

interface DeckProps extends ViewProps {
  cards?: CardType[];
  onCardDrop?: (measurements: CardDropMeasurements) => Promise<unknown>;
}

const Deck = ({ cards = [], onCardDrop, style, ...rest }: DeckProps) => (
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
          // Key by distance from the bottom of the deck so each physical card
          // keeps its component instance as the deck shrinks (index keys made
          // the next top card inherit the just-dragged card's state)
          key={cards.length - i}
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
