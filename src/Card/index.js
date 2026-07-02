import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Reanimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { cardHeight, cardWidth } from "../constants/board";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

const Card = ({ card = {}, disabled, flipped, onCardDrop, style, ...rest }) => {
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef(null);

  // Drag with translate transforms instead of mutating left/top layout props-
  // layout mutation via setNativeProps is unreliable on Fabric. The gesture math
  // runs on the UI thread; only the drop measurement hops back to JS.
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const reset = useCallback(() => {
    translateX.value = 0;
    translateY.value = 0;
    setDragging(false);
  }, [translateX, translateY]);

  // Runs on JS. measureInWindow (getBoundingClientRect on web) reflects the
  // translate transform; measure() reads offsetTop/Left on web and ignores
  // transforms, so the dragged position would be lost and the card would always
  // snap back. On a real drop we resolve the cell, then reset to the deck.
  const handleEnd = useCallback(
    (didDrop) => {
      if (!didDrop || !cardRef.current) {
        reset();
        return;
      }
      cardRef.current.measureInWindow((pageX, pageY, width, height) => {
        onCardDrop({ pageX, pageY, width, height }).then(reset, reset);
      });
    },
    [onCardDrop, reset]
  );

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onStart(() => {
      scale.value = 1.05;
      runOnJS(setDragging)(true);
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onFinalize((e, success) => {
      scale.value = 1;
      runOnJS(handleEnd)(success);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  if (disabled) {
    return (
      <View style={[styles.root, style]} {...rest}>
        {!flipped ? <CardBack /> : <CardFront card={card} />}
      </View>
    );
  }

  return (
    <GestureDetector gesture={gesture}>
      <Reanimated.View
        ref={cardRef}
        style={[styles.root, style, dragging && styles.dragging, animatedStyle]}
        {...rest}
      >
        {!flipped ? <CardBack /> : <CardFront card={card} />}
      </Reanimated.View>
    </GestureDetector>
  );
};

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
