import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import type { ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Reanimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

import { cardHeight, cardWidth } from "../constants/board";
import type { Card as CardType } from "../constants/cards";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

// Snap-back: soft enough for a playful overshoot on the way home to the deck.
const SNAP_BACK_SPRING = { damping: 15, stiffness: 180 };
// Fly-to-cell: stiff so the card settles fast — the move only commits once the
// springs rest, so a long tail would delay the turn.
const FLY_SPRING = { damping: 22, stiffness: 280 };

export type CardDropPoint = {
  centerX: number;
  centerY: number;
};

// A legal drop hands back where the card should fly to; the move only commits
// once the card has visually landed, so the swap to the placed board card is
// pixel-identical.
export type DropResult =
  | {
      placed: true;
      // Screen-space center of the target cell and the board's current zoom.
      cellCenter: { x: number; y: number };
      boardScale: number;
      commit: () => void;
    }
  | { placed: false };

interface CardProps extends ViewProps {
  card?: CardType;
  disabled?: boolean;
  flipped?: boolean;
  onCardDrop?: (point: CardDropPoint) => DropResult;
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
  // While an end-of-drag animation (snap-back or fly-to-cell) is running the
  // gesture is disabled, so the card can't be re-grabbed mid-flight.
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
  // Counts the fly-to-cell springs still moving; the move commits when the
  // last one rests.
  const flyRemaining = useSharedValue(0);

  const finishSnapBack = useCallback(() => {
    setSettling(false);
    setDragging(false);
  }, []);

  // Spring home to the deck, keeping the card's elevated zIndex until it has
  // settled so it doesn't slide underneath other UI on the way back.
  const snapBack = useCallback(() => {
    setSettling(true);
    scale.value = withSpring(1, SNAP_BACK_SPRING);
    translateY.value = withSpring(0, SNAP_BACK_SPRING);
    translateX.value = withSpring(0, SNAP_BACK_SPRING, () => {
      runOnJS(finishSnapBack)();
    });
  }, [scale, translateX, translateY, finishSnapBack]);

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
        snapBack();
        return;
      }
      // Shared-value reads from JS are synchronous, and the values are settled
      // once the finger has lifted.
      const result = onCardDrop({
        centerX: baseCenterX.value + translateX.value,
        centerY: baseCenterY.value + translateY.value,
      });
      if (!result.placed) {
        snapBack();
        return;
      }
      // Fly into the cell, scaling from screen size to the board zoom. The
      // commit waits for ALL three springs to rest: the placed board card must
      // appear exactly where this one settles or the swap would visibly jump.
      // Committing unmounts this card (its deck key disappears), completing
      // the swap.
      setSettling(true);
      const { commit } = result;
      flyRemaining.value = 3;
      const onSpringRest = () => {
        "worklet";
        flyRemaining.value -= 1;
        if (flyRemaining.value === 0) {
          runOnJS(commit)();
        }
      };
      scale.value = withSpring(result.boardScale, FLY_SPRING, onSpringRest);
      translateX.value = withSpring(
        result.cellCenter.x - baseCenterX.value,
        FLY_SPRING,
        onSpringRest
      );
      translateY.value = withSpring(
        result.cellCenter.y - baseCenterY.value,
        FLY_SPRING,
        onSpringRest
      );
    },
    [
      onCardDrop,
      snapBack,
      baseCenterX,
      baseCenterY,
      translateX,
      translateY,
      scale,
      flyRemaining,
    ]
  );

  const gesture = Gesture.Pan()
    .enabled(!settling)
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
      // The scale stays at pickup size here; handleEnd picks the animation
      // that brings it home (snap-back) or to the board zoom (fly-to-cell).
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
