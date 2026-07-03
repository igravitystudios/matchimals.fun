import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import type { ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Reanimated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

import { cardHeight, cardWidth } from "../constants/board";
import type { Card as CardType } from "../constants/cards";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

// How much the card grows when picked up. Placement math depends on it: a
// placed card's entrance starts at this scale (converted to board coordinates).
export const PICKUP_SCALE = 1.05;

const SETTLE_TIMING = { duration: 180, easing: Easing.out(Easing.cubic) };

export type CardDropPoint = {
  centerX: number;
  centerY: number;
};

// Where a placed card's entrance animation starts, relative to its cell:
// offsets in board pixels from the cell center, scale in board units.
export type CardEntrance = {
  x: number;
  y: number;
  scale: number;
};

interface CardProps extends ViewProps {
  card?: CardType;
  disabled?: boolean;
  flipped?: boolean;
  // Returns whether the card was placed. A placement commits the move
  // immediately (unmounting this deck card) and the placed board card animates
  // in from the release point, so the next deck card is grabbable right away.
  onCardDrop?: (point: CardDropPoint) => boolean;
  entrance?: CardEntrance;
  // Written while a drag is in flight so the board can preview the drop target
  // on the UI thread. dragActive only flips true once the drag-start
  // measurement lands, so readers never see a center derived from a stale base.
  dragCenterX?: SharedValue<number>;
  dragCenterY?: SharedValue<number>;
  dragActive?: SharedValue<boolean>;
}

// Slides a just-placed card from the drag release point into its cell. The
// start transform is captured at mount; the swap from the dragged deck card to
// this one happens in a single React commit, so the first frame renders
// exactly where the drag ended.
const EntranceView = ({
  entrance,
  style,
  children,
  ...rest
}: ViewProps & { entrance: CardEntrance }) => {
  const translateX = useSharedValue(entrance.x);
  const translateY = useSharedValue(entrance.y);
  const scale = useSharedValue(entrance.scale);

  useEffect(() => {
    translateX.value = withTiming(0, SETTLE_TIMING);
    translateY.value = withTiming(0, SETTLE_TIMING);
    scale.value = withTiming(1, SETTLE_TIMING);
  }, [translateX, translateY, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Reanimated.View style={[style, animatedStyle]} {...rest}>
      {children}
    </Reanimated.View>
  );
};

const Card = ({
  card = {} as CardType,
  disabled,
  flipped,
  onCardDrop,
  entrance,
  dragCenterX,
  dragCenterY,
  dragActive,
  style,
  ...rest
}: CardProps) => {
  const [dragging, setDragging] = useState(false);
  // While the snap-back animation is running the gesture is disabled, so the
  // card can't be re-grabbed mid-flight.
  const [settling, setSettling] = useState(false);
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

  const finishSnapBack = useCallback(() => {
    setSettling(false);
    setDragging(false);
  }, []);

  // Ease home to the deck, keeping the card's elevated zIndex until it has
  // settled so it doesn't slide underneath other UI on the way back.
  const snapBack = useCallback(() => {
    setSettling(true);
    scale.value = withTiming(1, SETTLE_TIMING);
    translateY.value = withTiming(0, SETTLE_TIMING);
    translateX.value = withTiming(0, SETTLE_TIMING, () => {
      runOnJS(finishSnapBack)();
    });
  }, [scale, translateX, translateY, finishSnapBack]);

  // Runs on JS at drag start, while the card is still at rest in the deck —
  // measureInWindow is reliable there (the pickup scale is center-origin, so
  // the center is unaffected even if it has already applied).
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
        snapBack();
        return;
      }
      // Shared-value reads from JS are synchronous, and the values are settled
      // once the finger has lifted.
      const placed = onCardDrop({
        centerX: baseCenterX.value + translateX.value,
        centerY: baseCenterY.value + translateY.value,
      });
      // A placement has already committed the move: this card unmounts on the
      // resulting re-render and the placed board card animates into the cell.
      if (!placed) {
        snapBack();
      }
    },
    [onCardDrop, snapBack, baseCenterX, baseCenterY, translateX, translateY]
  );

  const gesture = Gesture.Pan()
    .enabled(!settling)
    .minDistance(0)
    .onStart(() => {
      scale.value = PICKUP_SCALE;
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
      // The scale stays at pickup size here; a placement swaps this card for
      // the board card at the same visual size, and a snap-back animates it.
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
    if (entrance) {
      return (
        <EntranceView
          entrance={entrance}
          style={[styles.root, style]}
          {...rest}
        >
          {!flipped ? <CardBack /> : <CardFront card={card} />}
        </EntranceView>
      );
    }
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
