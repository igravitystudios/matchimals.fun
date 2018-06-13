import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../Card";
import {
  boardHeight,
  boardWidth,
  cardHeight,
  cardWidth,
  columns,
  rows,
} from "../constants/board";

const Board = ({ G }) => {
  let cells = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const id = columns * i + j;
      const value = G.cells[id];
      cells.push(
        <View key={id} id={id} style={styles.cell}>
          {value && <Card card={value} flipped disabled />}
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
});

export default Board;
