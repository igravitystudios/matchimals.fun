import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Polygon } from 'svgs';

import animals from '../../constants/animals';

const CardFront = ({ card, style }) => (
  <View style={[styles.root, style]}>
    <Svg
      width={100}
      height={140}
      xmlns="http://www.w3.org/2000/Svg"
      viewBox="0 0 100 140"
    >
      <Polygon
        id="top"
        points="50 70 100 0 0 0 50 70"
        fill={animals[card.top] && animals[card.top].color}
      />
      <Polygon
        id="right"
        points="50 70 100 140 100 0 50 70"
        fill={animals[card.right] && animals[card.right].color}
      />
      <Polygon
        id="bottom"
        points="50 70 0 140 100 140 50 70"
        fill={animals[card.bottom] && animals[card.bottom].color}
      />
      <Polygon
        id="left"
        points="50 70 0 0 0 140 50 70"
        fill={animals[card.left] && animals[card.left].color}
      />
    </Svg>
    {animals[card.top] && (
      <View
        style={{
          position: 'absolute',
          top: -32,
          left: 18,
          width: 64,
          height: 64,
        }}
      >
        {animals[card.top].icon}
      </View>
    )}
    {animals[card.right] && (
      <View
        style={{
          position: 'absolute',
          top: 38,
          right: -32,
          width: 64,
          height: 64,
        }}
      >
        <Text
          style={{
            position: 'absolute',
            top: -12,
            left: 14,
            width: 20,
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
            // textShadow: '1px 1px 0 rgba(41,26,19,0.69)',
          }}
        >
          {animals[card.right].score}
        </Text>
        {animals[card.right].icon}
      </View>
    )}
    {animals[card.bottom] && (
      <View
        style={{
          position: 'absolute',
          bottom: -32,
          left: 18,
          width: 64,
          height: 64,
        }}
      >
        <Text
          style={{
            position: 'absolute',
            top: -16,
            left: 22,
            width: 20,
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
            // textShadow: '1px 1px 0 rgba(41,26,19,0.69)',
          }}
        >
          {animals[card.bottom].score}
        </Text>
        {animals[card.bottom].icon}
      </View>
    )}
    {animals[card.left] && (
      <View
        style={{
          position: 'absolute',
          top: 38,
          left: -32,
          width: 64,
          height: 64,
        }}
      >
        {animals[card.left].icon}
      </View>
    )}
  </View>
);

CardFront.defaultProps = {
  card: {},
};

CardFront.propTypes = {
  card: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    overflow: 'hidden',
    borderRadius: 8,
  },
});

export default CardFront;
