import React, { forwardRef, useImperativeHandle } from "react";
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import WoodBackground from "./wood-background.jpg";
import { boardHeight, boardWidth } from "../constants/board";
import Board from "../Board";

// MIN_ZOOM stays high enough that the scaled board is always larger than the
// viewport (boardWidth/Height are thousands of px), which keeps the boundary
// clamp from inverting. MAX_ZOOM lets players read individual cards.
const MIN_ZOOM = 0.75;
const MAX_ZOOM = 1.5;

const clampValue = (value, min, max) => {
  "worklet";
  return Math.min(max, Math.max(min, value));
};

// Boundaries depend on the current scale: the on-screen board is
// boardWidth*scale wide, so it can pan until its far edge meets the viewport.
const clampToBoundaries = (left, top, scale, width, height) => {
  "worklet";
  const right = -(boardWidth * scale - width);
  const bottom = -(boardHeight * scale - height);
  return {
    left: Math.min(0, Math.max(right, left)),
    top: Math.min(0, Math.max(bottom, top)),
  };
};

const Table = forwardRef(({ style, ...rest }, ref) => {
  const { width, height } = useWindowDimensions();

  const centeredLeft = (style && style.left) || -((boardWidth - width) / 2);
  const centeredTop = (style && style.top) || -((boardHeight - height) / 2);

  // The committed (settled) transform. `saved*` snapshot it at the start of each
  // gesture so adding/lifting a finger never causes a jump; `origin*` is the
  // board point under the pinch focal, kept pinned to the focal as it scales.
  const translateX = useSharedValue(centeredLeft);
  const translateY = useSharedValue(centeredTop);
  const scale = useSharedValue(1);
  const savedX = useSharedValue(centeredLeft);
  const savedY = useSharedValue(centeredTop);
  const savedScale = useSharedValue(1);
  const originX = useSharedValue(0);
  const originY = useSharedValue(0);

  // Preserve the imperative API the rest of the app relies on: onCardDrop reads
  // _previousLeft/_previousTop/_previousScale to map a dropped card to a cell,
  // and Menu calls scrollToCenter().
  useImperativeHandle(ref, () => ({
    get _previousLeft() {
      return translateX.value;
    },
    get _previousTop() {
      return translateY.value;
    },
    get _previousScale() {
      return scale.value;
    },
    scrollToCenter() {
      translateX.value = centeredLeft;
      translateY.value = centeredTop;
      scale.value = 1;
      savedX.value = centeredLeft;
      savedY.value = centeredTop;
      savedScale.value = 1;
    },
  }));

  // One finger pans (maxPointers(1) hands off to the pinch as soon as a second
  // finger lands). Two fingers pinch-zoom toward the focal point, which also
  // pans as the fingers slide- matching the old PanResponder behavior.
  const pan = Gesture.Pan()
    .maxPointers(1)
    .onStart(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    })
    .onUpdate((e) => {
      const next = clampToBoundaries(
        savedX.value + e.translationX,
        savedY.value + e.translationY,
        scale.value,
        width,
        height
      );
      translateX.value = next.left;
      translateY.value = next.top;
    })
    .onEnd(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    });

  const pinch = Gesture.Pinch()
    .onStart((e) => {
      savedScale.value = scale.value;
      originX.value = (e.focalX - translateX.value) / scale.value;
      originY.value = (e.focalY - translateY.value) / scale.value;
    })
    .onUpdate((e) => {
      const nextScale = clampValue(
        savedScale.value * e.scale,
        MIN_ZOOM,
        MAX_ZOOM
      );
      // Keep the board point captured at onStart pinned under the live focal.
      const next = clampToBoundaries(
        e.focalX - originX.value * nextScale,
        e.focalY - originY.value * nextScale,
        nextScale,
        width,
        height
      );
      translateX.value = next.left;
      translateY.value = next.top;
      scale.value = nextScale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    });

  const gesture = Gesture.Simultaneous(pan, pinch);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.viewport} collapsable={false}>
        <Reanimated.View style={[styles.board, animatedStyle]}>
          <ImageBackground
            resizeMode="repeat"
            source={WoodBackground}
            style={styles.board}
          >
            <Board {...rest} />
          </ImageBackground>
        </Reanimated.View>
      </View>
    </GestureDetector>
  );
});

Table.displayName = "Table";

const styles = StyleSheet.create({
  // Untransformed full-bleed layer that owns the gesture, so the pinch focal
  // stays in a stable coordinate space while the board inside it scales.
  viewport: {
    flex: 1,
    overflow: "hidden",
  },
  board: {
    width: boardWidth,
    height: boardHeight,
    transformOrigin: "top left",
  },
});

export default Table;
