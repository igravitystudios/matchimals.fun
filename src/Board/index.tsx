import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../Card";
import type { Card as CardType } from "../constants/cards";
import type { GameState } from "../Matchimals/game";
import {
  boardHeight,
  boardWidth,
  cardHeight,
  cardWidth,
  columns,
  rows,
} from "../constants/board";

// Memoized so a placement re-renders only the affected cell, not every placed
// card's SVG tree — that full-board render happens synchronously at drop time
// and would delay the drop's visual response. Unchanged `value`s keep
// reference identity across moves (Immer structural sharing), so the shallow
// compare bails for the other ~474 cells.
const BoardCell = React.memo(
  ({ id, value }: { id: number; value: CardType | null }) => (
    <View id={`${id}`} style={styles.cell}>
      {value && <Card card={value} flipped disabled />}
    </View>
  )
);

BoardCell.displayName = "BoardCell";

const Board = ({ G }: { G: GameState }) => {
  let cells = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const id = columns * i + j;
      cells.push(<BoardCell key={id} id={id} value={G.cells[id]} />);
    }
  }

  return <View style={styles.root}>{cells}</View>;
};

const styles = StyleSheet.create({
  root: {
    width: boardWidth,
    height: boardHeight,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: cardWidth,
    height: cardHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Board;
