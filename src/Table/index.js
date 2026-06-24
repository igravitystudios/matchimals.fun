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

// MIN_ZOOM stays high enough that the scaled board is always larger than the
// viewport (boardWidth/Height are thousands of px), which keeps the boundary
// clamp from inverting. MAX_ZOOM lets players read individual cards.
const MIN_ZOOM = 0.75;
const MAX_ZOOM = 1.5;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const distanceBetween = (a, b) =>
  Math.hypot(a.pageX - b.pageX, a.pageY - b.pageY);

const midpointOf = (a, b) => ({
  x: (a.pageX + b.pageX) / 2,
  y: (a.pageY + b.pageY) / 2,
});

class Table extends Component {
  constructor(props) {
    super(props);

    const { height, width } = Dimensions.get("window");
    this._viewport = { height, width };
    this._centeredWindow = {
      top: -((boardHeight - height) / 2),
      left: -((boardWidth - width) / 2),
    };

    // _previousLeft/_previousTop/_previousScale describe the committed (settled)
    // transform. Matchimals' onCardDrop reads them to map a dropped card's
    // screen position to a board cell- keep them up to date on every release.
    this._previousLeft =
      (props.style && props.style.left) || this._centeredWindow.left || 0;
    this._previousTop =
      (props.style && props.style.top) || this._centeredWindow.top || 0;
    this._previousScale = 1;

    // Per-gesture baselines, reset whenever the active touch count changes so
    // adding/lifting a finger never causes a jump. _lastSingle tracks the pan
    // finger frame-to-frame; _pinch tracks the two-finger distance/midpoint.
    this._lastTouchCount = 0;
    this._lastSingle = null;
    this._pinch = null;

    // Pan/zoom with translate+scale transforms instead of mutating left/top
    // layout props- layout mutation via setNativeProps is unreliable on Fabric.
    this._pan = new Animated.ValueXY({
      x: this._previousLeft,
      y: this._previousTop,
    });
    this._scale = new Animated.Value(this._previousScale);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  scrollToCenter() {
    this._previousScale = 1;
    this._previousLeft = this._centeredWindow.left || 0;
    this._previousTop = this._centeredWindow.top || 0;
    this._scale.setValue(1);
    this._pan.setValue({ x: this._previousLeft, y: this._previousTop });
  }

  // Boundaries depend on the current scale: the on-screen board is
  // boardWidth*scale wide, so it can pan until its far edge meets the viewport.
  _clampToBoundaries(left, top, scale) {
    const { height, width } = this._viewport;
    const right = -(boardWidth * scale - width);
    const bottom = -(boardHeight * scale - height);
    return {
      left: Math.min(0, Math.max(right, left)),
      top: Math.min(0, Math.max(bottom, top)),
    };
  }

  _handlePanResponderMove = (e, gestureState) => {
    const touches = e.nativeEvent.touches;

    // Reset the per-gesture baselines when the finger count changes.
    if (touches.length !== this._lastTouchCount) {
      this._lastTouchCount = touches.length;
      this._lastSingle = null;
      this._pinch = null;
    }

    if (touches.length >= 2) {
      this._handlePinch(touches[0], touches[1]);
    } else if (touches.length === 1) {
      this._handlePan(touches[0]);
    }
  };

  _handlePan = (touch) => {
    const point = { x: touch.pageX, y: touch.pageY };
    if (this._lastSingle === null) {
      this._lastSingle = point;
      return;
    }
    const { left, top } = this._clampToBoundaries(
      this._previousLeft + (point.x - this._lastSingle.x),
      this._previousTop + (point.y - this._lastSingle.y),
      this._previousScale
    );
    this._previousLeft = left;
    this._previousTop = top;
    this._lastSingle = point;
    this._pan.setValue({ x: left, y: top });
  };

  _handlePinch = (a, b) => {
    const distance = distanceBetween(a, b);
    const midpoint = midpointOf(a, b);
    if (this._pinch === null) {
      this._pinch = { distance, midpoint };
      return;
    }

    const scale = this._previousScale;
    const nextScale = clamp(
      scale * (distance / this._pinch.distance),
      MIN_ZOOM,
      MAX_ZOOM
    );
    // Pin the board point under the previous midpoint to the new midpoint, so
    // the gesture zooms toward the fingers and pans as they slide.
    const { left, top } = this._clampToBoundaries(
      midpoint.x -
        (nextScale * (this._pinch.midpoint.x - this._previousLeft)) / scale,
      midpoint.y -
        (nextScale * (this._pinch.midpoint.y - this._previousTop)) / scale,
      nextScale
    );

    this._previousScale = nextScale;
    this._previousLeft = left;
    this._previousTop = top;
    this._pinch = { distance, midpoint };
    this._scale.setValue(nextScale);
    this._pan.setValue({ x: left, y: top });
  };

  _handlePanResponderEnd = () => {
    // Running values are committed continuously during the gesture; just clear
    // the per-gesture baselines so the next gesture starts clean.
    this._lastTouchCount = 0;
    this._lastSingle = null;
    this._pinch = null;
  };

  render() {
    const { ...rest } = this.props;

    return (
      <Animated.View
        style={[
          styles.root,
          {
            transformOrigin: "top left",
            transform: [
              { translateX: this._pan.x },
              { translateY: this._pan.y },
              { scale: this._scale },
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
