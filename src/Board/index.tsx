import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../Card";
import type { CardEntrance } from "../Card";
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
      const value = G.cells[id];
      // The most recently placed card slides in from the drag release point;
      // its cell is elevated so the moving card passes over its neighbors.
      const isEntering = lastPlacement?.cell === id;
      cells.push(
        <View
          key={id}
          id={`${id}`}
          style={[styles.cell, isEntering && styles.cellEntering]}
        >
          {value && (
            <Card
              card={value}
              flipped
              disabled
              entrance={isEntering ? lastPlacement : undefined}
            />
          )}
        </View>
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
