import React, { Component } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

import { cardHeight, cardWidth } from "../constants/board";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { dragging: false };

    // Drag with translate transforms instead of mutating left/top layout
    // props- layout mutation via setNativeProps is unreliable on Fabric.
    this._pan = new Animated.ValueXY({ x: 0, y: 0 });
    this._scale = new Animated.Value(1);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  _setCardRef = (card) => {
    this.card = card;
  };

  _handlePanResponderGrant = () => {
    this.setState({ dragging: true });
    this._scale.setValue(1.05);
  };

  _handlePanResponderMove = (e, gestureState) => {
    this._pan.setValue({ x: gestureState.dx, y: gestureState.dy });
  };

  _handlePanResponderEnd = (e, gestureState) => {
    this._pan.setValue({ x: gestureState.dx, y: gestureState.dy });
    this._scale.setValue(1);

    // measureInWindow (getBoundingClientRect on web) reflects the translate
    // transform; measure() reads offsetTop/Left on web and ignores transforms,
    // so the dragged position was lost and the card always snapped back.
    this.card.measureInWindow((pageX, pageY, width, height) => {
      this.props.onCardDrop({ pageX, pageY, width, height }).then(() => {
        // Reset card position back to default (top of deck)
        this._pan.setValue({ x: 0, y: 0 });
        this.setState({ dragging: false });
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
      <Animated.View
        ref={this._setCardRef}
        style={[
          styles.root,
          style,
          this.state.dragging && styles.dragging,
          {
            transform: [
              { translateX: this._pan.x },
              { translateY: this._pan.y },
              { scale: this._scale },
            ],
          },
        ]}
        {...this._panResponder.panHandlers}
        {...rest}
      >
        {!flipped ? <CardBack /> : <CardFront card={card} />}
      </Animated.View>
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
  dragging: {
    zIndex: 9999,
  },
});

export default Card;
