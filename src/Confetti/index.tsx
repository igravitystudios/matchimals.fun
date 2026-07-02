import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ConfettiView from "./ConfettiView";
import type { ConfettiViewProps } from "./ConfettiView";

import { colors } from "../constants/colors";
const colorValues = Object.values(colors);

class Confetti extends Component<Partial<ConfettiViewProps>> {
  _confettiView: ConfettiView | null = null;

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
          ref={(node) => {
            this._confettiView = node;
          }}
          colors={colorValues}
          size={3}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // RN 0.85 removed absoluteFillObject; absoluteFill is the same plain object.
  root: {
    ...StyleSheet.absoluteFill,
  },
});

export default Confetti;
