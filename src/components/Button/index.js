import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

class Button extends Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <TouchableHighlight underlayColor="transparent" {...rest}>
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{children}</Text>
          </View>
          <View style={styles.buttonShadow} />
        </View>
      </TouchableHighlight>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 240,
    height: 66,
    position: "relative",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 240,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#DB7270",
    borderWidth: 4,
    borderColor: "#FF9E9C",
  },
  buttonShadow: {
    position: "absolute",
    width: 240,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#945C5A",
    bottom: 0,
    left: 0,
    zIndex: -1,
    shadowColor: "rgba(0,0,0,0.420)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  buttonText: {
    fontFamily: "Dimbo",
    fontSize: 32,
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.420)",
    textShadowRadius: 0,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
  },
});

export default Button;
