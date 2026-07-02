import React from "react";
import { View } from "react-native";

import { deck } from "./constants/cards";
import Card from "./Card";

const Print = () => {
  // const doubleDeck = deck.concat(deck);

  return (
    <View
      style={{
        // width: "8.5in",
        // height: "11in",

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {deck.map((card, i) => {
        return (
          <Card
            key={i}
            card={card}
            flipped={true}
            style={{
              margin: 96,
              position: "relative",
            }}
            disabled={true}
          />
        );
      })}
    </View>
  );
};

export default Print;
