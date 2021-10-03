import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Polygon } from "svgs";

import { animals } from "../constants/animals";
import { animalSize, cardHeight, cardWidth } from "../constants/board";

import Animals from "../Animals";

const CardFront = ({ card = {}, style }) => (
  <View style={[styles.root, style]}>
    <Svg
      width={cardWidth}
      height={cardHeight}
      xmlns="http://www.w3.org/2000/Svg"
      viewBox="0 0 100 140"
    >
      <Polygon
        id="top"
        points="50 70 100 0 0 0 50 70"
        fill={animals[card.top].color}
      />
      <Polygon
        id="right"
        points="50 70 100 140 100 0 50 70"
        fill={animals[card.right].color}
      />
      <Polygon
        id="bottom"
        points="50 70 0 140 100 140 50 70"
        fill={animals[card.bottom].color}
      />
      <Polygon
        id="left"
        points="50 70 0 0 0 140 50 70"
        fill={animals[card.left].color}
      />
    </Svg>
    {animals[card.top] && (
      <View
        style={{
          position: "absolute",
          top: -(animalSize / 2),
          left: (cardWidth - animalSize) / 2,
          width: animalSize,
          height: animalSize,
        }}
      >
        {React.createElement(Animals[animals[card.top].animal])}
      </View>
    )}
    {animals[card.right] && (
      <View
        style={{
          position: "absolute",
          top: (cardHeight - animalSize) / 2,
          right: -(animalSize / 2),
          width: animalSize,
          height: animalSize,
        }}
      >
        <Text
          style={[
            styles.score,
            {
              position: "absolute",
              top: -(animalSize * 0.2),
              left: animalSize * 0.21875,
            },
          ]}
        >
          {animals[card.right].score}
        </Text>
        {React.createElement(Animals[animals[card.right].animal])}
      </View>
    )}
    {animals[card.bottom] && (
      <View
        style={{
          position: "absolute",
          bottom: -(animalSize / 2),
          left: (cardWidth - animalSize) / 2,
          width: animalSize,
          height: animalSize,
        }}
      >
        <Text
          style={[
            styles.score,
            {
              position: "absolute",
              width: "100%",
              top: -(animalSize * 0.25),
            },
          ]}
        >
          {animals[card.bottom].score}
        </Text>
        {React.createElement(Animals[animals[card.bottom].animal])}
      </View>
    )}
    {animals[card.left] && (
      <View
        style={{
          position: "absolute",
          top: (cardHeight - animalSize) / 2,
          left: -(animalSize / 2),
          width: animalSize,
          height: animalSize,
        }}
      >
        {React.createElement(Animals[animals[card.left].animal])}
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  root: {
    position: "relative",
    width: cardWidth,
    height: cardHeight,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 8,
  },
  score: {
    color: "#fff",
    fontSize: animalSize * 0.21875,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.69)",
    textShadowRadius: 0,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default CardFront;
