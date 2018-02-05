import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import CardBack from './CardBack';
import CardFront from './CardFront';

const Card = ({ card, flipped, height, style, width, ...rest }) => (
  <View
    style={[
      styles.root,
      {
        width,
        height,
      },
      style,
    ]}
    {...rest}
  >
    {!flipped ? <CardBack /> : <CardFront card={card} />}
  </View>
);

Card.defaultProps = {
  width: 100,
  height: 140,
  card: {},
};

Card.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    overflow: 'hidden',
    borderRadius: 8,
    // boxShadow: '1px 1px 1px rgba(41,26,19,0.420)',
  },
});

export default Card;
