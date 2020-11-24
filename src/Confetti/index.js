import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ConfettiView from "./ConfettiView";

import { colors } from "../constants/colors";
const colorValues = Object.values(colors);

class Confetti extends Component {
  componentDidMount() {
    if (this._confettiView) {
      this._confettiView.startConfetti();
    }
  }

  componentWillUnmount() {
    if (this._confettiView) {
      this._confettiView.stopConfetti();
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <ConfettiView
          ref={(node) => (this._confettiView = node)}
          colors={colorValues}
          size={3}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Confetti;
