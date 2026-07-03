import React from "react";
import { View } from "react-native";

import { deck } from "./constants/cards";
import Card from "./Card";

const Print = () => {
  return (
    <View
      style={{
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
