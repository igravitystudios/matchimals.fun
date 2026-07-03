import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import Reanimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { cardHeight, cardWidth } from "../constants/board";
import { SETTLE_TIMING } from "../Card";
import CardFront from "../Card/CardFront";
import type { Card as CardType } from "../constants/cards";

export interface FlightParams {
  card: CardType;
  // Screen-space card centers and scales at the start (drag release) and end
  // (the target cell) of the flight.
  fromX: number;
  fromY: number;
  fromScale: number;
  toX: number;
  toY: number;
  toScale: number;
}

export interface FlyingCardHandle {
  fly: (params: FlightParams) => void;
  hide: () => void;
}

interface FlyingCardProps {
  nextCard?: CardType;
  // Fires when a flight lands. The owner reveals the placed board card
  // underneath the (still visible) overlay, then calls hide().
  onArrived?: () => void;
}

// The visual response to a successful drop. Pre-mounted with the top deck
// card's face already rendered, so starting a flight is only shared-value
// writes — it appears on the next frame no matter how long the placement
// render takes. It keeps covering the target cell after landing until the
// owner has mounted the real board card beneath it and calls hide().
const FlyingCard = forwardRef<FlyingCardHandle, FlyingCardProps>(
  ({ nextCard, onArrived }, ref) => {
    // The face is frozen for the duration of a flight: the commit swaps
    // nextCard to the following deck card mid-flight, and the overlay must
    // keep showing the card that was just placed.
    const [flightCard, setFlightCard] = useState<CardType | null>(null);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    // The worklet needs a stable JS target; the ref keeps the latest callback.
    const onArrivedRef = useRef(onArrived);
    onArrivedRef.current = onArrived;
    const notifyArrived = useCallback(() => {
      onArrivedRef.current?.();
    }, []);

    useImperativeHandle(ref, () => ({
      fly(params) {
        // Same object the overlay is already rendering (nextCard), so this
        // re-render is a memo bail, not an SVG mount.
        setFlightCard(params.card);
        translateX.value = params.fromX - cardWidth / 2;
        translateY.value = params.fromY - cardHeight / 2;
        scale.value = params.fromScale;
        opacity.value = 1;
        translateX.value = withTiming(
          params.toX - cardWidth / 2,
          SETTLE_TIMING
        );
        translateY.value = withTiming(
          params.toY - cardHeight / 2,
          SETTLE_TIMING
        );
        scale.value = withTiming(params.toScale, SETTLE_TIMING, (finished) => {
          // A new flight cancels this one; only a completed landing counts as
          // an arrival.
          if (finished) {
            runOnJS(notifyArrived)();
          }
        });
      },
      hide() {
        // A short fade covers any sub-frame gap between the board card's
        // native mount and this overlay disappearing. The face swaps to
        // nextCard only once fully invisible.
        opacity.value = withTiming(0, { duration: 80 }, (finished) => {
          if (finished) {
            runOnJS(setFlightCard)(null);
          }
        });
      },
    }));

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    }));

    const card = flightCard ?? nextCard;

    return (
      <Reanimated.View style={[styles.root, animatedStyle]}>
        {card && <CardFront card={card} />}
      </Reanimated.View>
    );
  }
);

FlyingCard.displayName = "FlyingCard";

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    top: 0,
    width: cardWidth,
    height: cardHeight,
    zIndex: 9999,
    pointerEvents: "none",
  },
});

export default FlyingCard;
