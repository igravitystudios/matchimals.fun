import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../Card";
import type { CardEntrance } from "../Card";
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

export type LastPlacement = CardEntrance & { cell: number };

// Memoized so a placement re-renders only the affected cells, not every placed
// card's SVG tree — that full-board render happens synchronously at drop time
// and would delay the placed card's entrance animation. Unchanged `value`s keep
// reference identity across moves (Immer structural sharing), so the shallow
// compare bails for the other ~473 cells.
const BoardCell = React.memo(
  ({
    id,
    value,
    entrance,
  }: {
    id: number;
    value: CardType | null;
    entrance?: CardEntrance;
  }) => (
    <View
      id={`${id}`}
      // The most recently placed card slides in from the drag release point;
      // its cell is elevated so the moving card passes over its neighbors.
      style={[styles.cell, entrance && styles.cellEntering]}
    >
      {value && <Card card={value} flipped disabled entrance={entrance} />}
    </View>
  )
);

BoardCell.displayName = "BoardCell";

const Board = ({
  G,
  lastPlacement,
}: {
  G: GameState;
  lastPlacement?: LastPlacement | null;
}) => {
  let cells = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const id = columns * i + j;
      cells.push(
        <BoardCell
          key={id}
          id={id}
          value={G.cells[id]}
          entrance={lastPlacement?.cell === id ? lastPlacement : undefined}
        />
      );
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
  cellEntering: {
    zIndex: 1,
  },
});

export default Board;
