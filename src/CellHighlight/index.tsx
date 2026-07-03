import React from "react";
import { StyleSheet } from "react-native";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

import { cardHeight, cardWidth, columns, rows } from "../constants/board";

interface CellHighlightProps {
  // Live drag position in window coordinates, driven by the dragged Card.
  dragCenterX: SharedValue<number>;
  dragCenterY: SharedValue<number>;
  dragActive: SharedValue<boolean>;
  // The Table's committed transform, needed to map window coords into board
  // coords. This component renders inside the transformed board layer, so its
  // own left/top are in board pixels and it is exactly cell-sized at any zoom.
  tableX: SharedValue<number>;
  tableY: SharedValue<number>;
  tableScale: SharedValue<number>;
}

// Previews the cell a dragged card would drop into. Everything runs in a
// single UI-thread worklet — no React re-renders while dragging. This must use
// the same window→cell math as onCardDrop so the card always lands on the
// highlighted cell.
const CellHighlight = ({
  dragCenterX,
  dragCenterY,
  dragActive,
  tableX,
  tableY,
  tableScale,
}: CellHighlightProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const boardX = (dragCenterX.value - tableX.value) / tableScale.value;
    const boardY = (dragCenterY.value - tableY.value) / tableScale.value;
    const col = Math.floor(boardX / cardWidth);
    const row = Math.floor(boardY / cardHeight);
    const visible =
      dragActive.value && col >= 0 && col < columns && row >= 0 && row < rows;
    return {
      opacity: visible ? 1 : 0,
      transform: [
        { translateX: col * cardWidth },
        { translateY: row * cardHeight },
      ],
    };
  });

  return <Reanimated.View style={[styles.highlight, animatedStyle]} />;
};

const styles = StyleSheet.create({
  highlight: {
    position: "absolute",
    left: 0,
    top: 0,
    width: cardWidth,
    height: cardHeight,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    pointerEvents: "none",
  },
});

export default CellHighlight;
