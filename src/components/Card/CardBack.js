import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Logo from '../Logo';

const CardBack = ({ height, style, width }) => (
  <View
    style={[
      styles.root,
      {
        width,
        height,
      },
      style,
    ]}
  >
    <Logo width={80} height={24} fill="#9F9FB7" />
  </View>
);

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});

export default CardBack;
