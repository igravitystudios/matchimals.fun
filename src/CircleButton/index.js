import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../constants/colors";

class CircleButton extends Component {
  render() {
    const { children, color, ...rest } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} {...rest}>
        <View
          style={[
            styles.button,
            {
              backgroundColor: color || colors.blueLight,
            },
          ]}
        >
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>{children}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#fff",
  },
  buttonInner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: colors.grayDark,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: "Dimbo",
    fontSize: 32,
    color: colors.grayDark,
  },
});

export default CircleButton;
