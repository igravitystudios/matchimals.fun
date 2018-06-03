import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Nameplate = ({ style, ...rest }) => (
  <View style={[styles.root, style]} {...rest}>
    <Text>Hello</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    position: "relative",
  },
});

export default Nameplate;
