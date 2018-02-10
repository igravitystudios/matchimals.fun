import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, StyleSheet, View } from 'react-native';

import CardBack from './CardBack';
import CardFront from './CardFront';

class Card extends Component {
  constructor(props) {
    super(props);

    this._panResponder = {};
    this._previousLeft = 0;
    this._previousTop = 0;
    this._cardStyles = {};
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._cardStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
      },
    };
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  _setCardRef = card => {
    this.card = card;
  };

  _activeDrag(gestureState) {
    this._cardStyles.style.zIndex = gestureState.dy;
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.card && this.card.setNativeProps(this._cardStyles);
  }

  _handleStartShouldSetPanResponder = (e, gestureState) => {
    // Should we become active when the user presses down on the card?
    return true;
  };

  _handleMoveShouldSetPanResponder = (e, gestureState) => {
    // Should we become active when the user touches the card?
    return false;
  };

  _handlePanResponderGrant = (e, gestureState) => {
    this._activeDrag(gestureState);
  };

  _handlePanResponderMove = (e, gestureState) => {
    this._activeDrag(gestureState);
    this._cardStyles.style.left = this._previousLeft + gestureState.dx;
    this._cardStyles.style.top = this._previousTop + gestureState.dy;
    this._cardStyles.zIndex = e.timeStamp; // Most recently dragged card always on top
    this._updateNativeStyles();
  };

  _handlePanResponderEnd = (e, gestureState) => {
    this._activeDrag(gestureState);
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;

    this.card.measure((x, y, width, height, pageX, pageY) => {
      console.log({ x, y, width, height, pageX, pageY });
    });
  };

  render() {
    const { card, flipped, height, style, width, ...rest } = this.props;
    return (
      <View
        ref={this._setCardRef}
        style={[
          styles.root,
          {
            width,
            height,
          },
          style,
        ]}
        {...this._panResponder.panHandlers}
        {...rest}
      >
        {!flipped ? <CardBack /> : <CardFront card={card} />}
      </View>
    );
  }
}

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
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    overflow: 'hidden',
    borderRadius: 8,
    // boxShadow: '1px 1px 1px rgba(41,26,19,0.420)',
  },
});

export default Card;
