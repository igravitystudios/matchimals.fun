import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

class HUD extends Component {
  render() {
    const { children, style, ...rest } = this.props;

    return (
      <View style={[styles.root, style]} {...rest}>
        <View style={styles.children}>{children}</View>
      </View>
    );
  }
}

HUD.propTypes = {
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  root: {},
  children: {},
});

export default HUD;
