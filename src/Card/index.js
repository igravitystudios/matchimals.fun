import React, { Component } from "react";
import { PanResponder, StyleSheet, View } from "react-native";

import { cardHeight, cardWidth } from "../constants/board";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

class Card extends Component {
  constructor(props) {
    super(props);

    this._panResponder = {};
    this._previousLeft = (props.style && props.style.left) || 0;
    this._previousTop = (props.style && props.style.top) || 0;
    this._cardStyles = {};
  }

  UNSAFE_componentWillMount() {
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

  _setCardRef = (card) => {
    this.card = card;
  };

  _activeDrag(e, gestureState) {
    this._cardStyles.style.zIndex = e.timeStamp;
    this._cardStyles.style.transform = [{ scale: 1.05 }];
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

    this._cardStyles.style.left = this._previousLeft;
    this._cardStyles.style.top = this._previousTop;
    this._cardStyles.style.transform = [{ scale: 1 }];
    this._updateNativeStyles();

    this.card.measure((x, y, width, height, pageX, pageY) => {
      // console.log(x, y, width, height, pageX, pageY);
      this.props.onCardDrop({ x, y, width, height, pageX, pageY }).then(() => {
        // Reset card position back to default (top of deck)
        this._previousLeft = 0;
        this._previousTop = 0;
        this._cardStyles.style.left = 0;
        this._cardStyles.style.top = 0;
        this._updateNativeStyles();
      });
    });
  };

  render() {
    const {
      card = {},
      disabled,
      flipped,
      onCardDrop, // prevent from being applied to ...rest
      style,
      ...rest
    } = this.props;

    if (disabled) {
      return (
        <View style={[styles.root, style]} {...rest}>
          {!flipped ? <CardBack /> : <CardFront card={card} />}
        </View>
      );
    }

    return (
      <View
        ref={this._setCardRef}
        style={[styles.root, style]}
        {...this._panResponder.panHandlers}
        {...rest}
      >
        {!flipped ? <CardBack /> : <CardFront card={card} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    width: cardWidth,
    height: cardHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
});

export default Card;
