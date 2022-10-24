import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import CardBackground from "./card-back.png";
import { cardHeight, cardWidth } from "../constants/board";
import Logo from "../Logo";

const CardBack = ({ height, style, width }) => (
  <View style={[styles.root, style]}>
    <ImageBackground source={CardBackground} style={styles.root}>
      <View>
        <Logo width={80} />
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  root: {
    width: cardWidth,
    height: cardHeight,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 8,
  },
});

export default CardBack;
