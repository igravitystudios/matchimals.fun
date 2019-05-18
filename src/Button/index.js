import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../constants/colors";

class Button extends Component {
  render() {
    const { children, color, selected, ...rest } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} {...rest}>
        <View
          style={[
            styles.button,
            color && { backgroundColor: color },
            selected && styles.selected,
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
    height: 64,
    backgroundColor: "#C5E5F0",
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#fff",
  },
  selected: {
    // borderColor: colors.greenLight,
    backgroundColor: colors.yellowLight,
  },
  buttonInner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: colors.grayDark,
    borderRadius: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontFamily: "Dimbo",
    fontSize: 32,
    color: colors.grayDark,
  },
});

export default Button;
