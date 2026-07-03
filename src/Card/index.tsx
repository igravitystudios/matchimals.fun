import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import type { ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Reanimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

import { cardHeight, cardWidth } from "../constants/board";
import type { Card as CardType } from "../constants/cards";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

export type CardDropPoint = {
  centerX: number;
  centerY: number;
};

interface CardProps extends ViewProps {
  card?: CardType;
  disabled?: boolean;
  flipped?: boolean;
  onCardDrop?: (point: CardDropPoint) => Promise<unknown>;
  // Written while a drag is in flight so the board can preview the drop target
  // on the UI thread. dragActive only flips true once the drag-start
  // measurement lands, so readers never see a center derived from a stale base.
  dragCenterX?: SharedValue<number>;
  dragCenterY?: SharedValue<number>;
  dragActive?: SharedValue<boolean>;
}

const Card = ({
  card = {} as CardType,
  disabled,
  flipped,
  onCardDrop,
  dragCenterX,
  dragCenterY,
  dragActive,
  style,
  ...rest
}: CardProps) => {
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef<View>(null);
  const baseMeasured = useRef(false);

  // Drag with translate transforms instead of mutating left/top layout props-
  // layout mutation via setNativeProps is unreliable on Fabric. The gesture math
  // runs on the UI thread; only the drag-start measurement hops back to JS.
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  // The card's resting center in window coordinates, measured once at drag
  // start. The live center is base + translation, so the drop point never
  // depends on a measurement taken while the card is mid-flight (measureInWindow
  // can lag the UI-thread transform by a frame or two on Fabric).
  const baseCenterX = useSharedValue(0);
  const baseCenterY = useSharedValue(0);

  const reset = useCallback(() => {
    translateX.value = 0;
    translateY.value = 0;
    setDragging(false);
  }, [translateX, translateY]);

  // Runs on JS at drag start, while the card is still at rest in the deck —
  // measureInWindow is reliable there (the 1.05 pickup scale is center-origin,
  // so the center is unaffected even if it has already applied).
  const startDrag = useCallback(() => {
    setDragging(true);
    baseMeasured.current = false;
    cardRef.current?.measureInWindow((pageX, pageY, width, height) => {
      baseCenterX.value = pageX + width / 2;
      baseCenterY.value = pageY + height / 2;
      baseMeasured.current = true;
      if (dragCenterX && dragCenterY && dragActive) {
        dragCenterX.value = baseCenterX.value + translateX.value;
        dragCenterY.value = baseCenterY.value + translateY.value;
        dragActive.value = true;
      }
    });
  }, [
    baseCenterX,
    baseCenterY,
    translateX,
    translateY,
    dragCenterX,
    dragCenterY,
    dragActive,
  ]);

  const handleEnd = useCallback(
    (didDrop: boolean) => {
      // A release before the drag-start measurement resolves (an instant tap)
      // has no trustworthy drop point — treat it as a cancelled drag.
      if (!didDrop || !baseMeasured.current || !onCardDrop) {
        reset();
        return;
      }
      // Shared-value reads from JS are synchronous, and the values are settled
      // once the finger has lifted.
      onCardDrop({
        centerX: baseCenterX.value + translateX.value,
        centerY: baseCenterY.value + translateY.value,
      }).then(reset, reset);
    },
    [onCardDrop, reset, baseCenterX, baseCenterY, translateX, translateY]
  );

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onStart(() => {
      scale.value = 1.05;
      runOnJS(startDrag)();
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      if (dragCenterX && dragCenterY && dragActive && dragActive.value) {
        dragCenterX.value = baseCenterX.value + e.translationX;
        dragCenterY.value = baseCenterY.value + e.translationY;
      }
    })
    .onFinalize((e, success) => {
      scale.value = 1;
      if (dragActive) {
        dragActive.value = false;
      }
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
