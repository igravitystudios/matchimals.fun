import React from "react";
import { StyleSheet, View } from "react-native";

import { cardHeight, cardWidth } from "../../constants/board";
import Logo from "../Logo";

const CardBack = ({ height, style, width }) => (
  <View style={[styles.root, style]}>
    <Logo width={80} height={24} fill="#9F9FB7" />
  </View>
);

const styles = StyleSheet.create({
  root: {
    width: cardWidth,
    height: cardHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    overflow: "hidden",
    borderRadius: 8,
  },
});

export default CardBack;
