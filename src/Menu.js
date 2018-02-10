import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// import Button from './components/Button';

const Menu = ({ onMenuToggle, onGameReset }) => (
  <View style={styles.root}>
    <Button
      color="#fff"
      style={styles.menu}
      onPress={onGameReset}
      title="Reset game"
    />
    <Button
      color="#fff"
      style={styles.menu}
      onPress={onMenuToggle}
      title="Back to game"
    />
  </View>
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,13,10,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: '8px',
    // padding: '8px',
    // overflowY: 'auto',
  },
  menu: {
    margin: '8px',
  },
});

export default Menu;
