import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  PanResponder,
  StyleSheet,
} from "react-native";

import WoodBackground from "./wood-background.jpg";
import { boardHeight, boardWidth } from "../constants/board";
import Board from "../Board";

class Table extends Component {
  constructor(props) {
    super(props);

    const { height, width } = Dimensions.get("window");
    this._boundaries = {
      top: 0,
      right: -(boardWidth - width),
      bottom: -(boardHeight - height),
      left: 0,
    };
    this._centeredWindow = {
      top: -((boardHeight - height) / 2),
      left: -((boardWidth - width) / 2),
    };

    // _previousLeft/_previousTop are read by Matchimals' onCardDrop to map a
    // dropped card's screen position to a board cell- keep them up to date.
    this._previousLeft =
      (props.style && props.style.left) || this._centeredWindow.left || 0;
    this._previousTop =
      (props.style && props.style.top) || this._centeredWindow.top || 0;

    // Pan with translate transforms instead of mutating left/top layout
    // props- layout mutation via setNativeProps is unreliable on Fabric.
    this._pan = new Animated.ValueXY({
      x: this._previousLeft,
      y: this._previousTop,
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  scrollToCenter() {
    this._previousLeft = this._centeredWindow.left || 0;
    this._previousTop = this._centeredWindow.top || 0;
    this._pan.setValue({ x: this._previousLeft, y: this._previousTop });
  }

  _clampToBoundaries(left, top) {
    return {
      left: Math.min(
        this._boundaries.left,
        Math.max(this._boundaries.right, left)
      ),
      top: Math.min(
        this._boundaries.top,
        Math.max(this._boundaries.bottom, top)
      ),
    };
  }

  _handlePanResponderMove = (e, gestureState) => {
    if (gestureState.numberActiveTouches === 1) {
      const { left, top } = this._clampToBoundaries(
        this._previousLeft + gestureState.dx,
        this._previousTop + gestureState.dy
      );
      this._pan.setValue({ x: left, y: top });
    }
  };

  _handlePanResponderEnd = (e, gestureState) => {
    const { left, top } = this._clampToBoundaries(
      this._previousLeft + gestureState.dx,
      this._previousTop + gestureState.dy
    );
    this._previousLeft = left;
    this._previousTop = top;
    this._pan.setValue({ x: left, y: top });
  };

  render() {
    const { ...rest } = this.props;

    return (
      <Animated.View
        style={[
          styles.root,
          {
            transform: [
              { translateX: this._pan.x },
              { translateY: this._pan.y },
            ],
          },
        ]}
        {...this._panResponder.panHandlers}
      >
        <ImageBackground
          resizeMode="repeat"
          source={WoodBackground}
          style={styles.root}
        >
          <Board {...rest} />
        </ImageBackground>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: boardWidth,
    height: boardHeight,
  },
});

export default Table;
