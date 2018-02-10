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

  _activeDrag(e, gestureState) {
    this._cardStyles.style.zIndex = e.timeStamp;
    this._cardStyles.style.transform = [{ scale: 1.1 }];
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
    this._activeDrag(e, gestureState);
  };

  _handlePanResponderMove = (e, gestureState) => {
    this._activeDrag(e, gestureState);
    this._cardStyles.style.left = this._previousLeft + gestureState.dx;
    this._cardStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  };

  _handlePanResponderEnd = (e, gestureState) => {
    this._activeDrag(e, gestureState);
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;

    // Align to nearest 100/140 grid cell
    const snapLeft = Math.round(this._previousLeft / 100) * 100;
    const snapTop = Math.round(this._previousTop / 140) * 140;
    this._previousLeft = snapLeft;
    this._previousTop = snapTop;
    this._cardStyles.style.left = snapLeft;
    this._cardStyles.style.top = snapTop;
    this._cardStyles.style.transform = [{ scale: 1 }];
    this._updateNativeStyles();

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
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 8,
  },
});

export default Card;
