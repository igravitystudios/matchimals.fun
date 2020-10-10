import React, { useCallback, useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cardHeight, cardWidth, columns } from "../constants/board";
import Deck from "../Deck";
import Button from "../Button";
import CircleButton from "../CircleButton";
import Nameplate from "../Nameplate";
import Table from "../Table";
import Menu from "../Menu";
import Victory from "../Victory";
import { isLegalMove } from "./game";
import { useMusic } from "../Music";

const Matchimals = ({ backToMainMenu, ctx, G, moves, ...rest }) => {
  const [showMenu, setShowMenu] = useState(false);
  const music = useMusic();
  const tableRef = useRef();
  const insets = useSafeAreaInsets();

  const onCardDrop = useCallback(
    (measurements) => {
      // Get the top left corner of the card in relation to the viewport
      const cardLeft = measurements.pageX;
      const cardTop = measurements.pageY;

      // Get the top left corner of the viewport in relation to the entire table
      const tableLeft = tableRef.current._previousLeft;
      const tableTop = tableRef.current._previousTop;

      // Calculate the total distance from the table's edge to the card's edge
      const distanceLeft = Math.abs(tableLeft - cardLeft);
      const distanceTop = Math.abs(tableTop - cardTop);

      // Calculate the total distance in "cells"
      const cellsFromLeft = Math.round(distanceLeft / cardWidth);
      const cellsFromTop = Math.round(distanceTop / cardHeight);

      // Calculate the target cell's id
      const targetCell = cellsFromTop * columns + cellsFromLeft;

      return new Promise((resolve) => {
        if (isLegalMove(G, ctx, targetCell)) {
          music.playSoundEffect1(); // Play card drop sound effect
          moves.placeCard(targetCell);
        } else {
          music.playSoundEffect3(); // Play mismatched card sound effect
        }
        resolve();
      });
    },
    [G, ctx, moves, music]
  );

  const onGamePass = useCallback(() => {
    music.playSoundEffect2(); // Play pass card sound effect
    moves.pass();
  }, [moves, music]);

  return (
    <>
      <View style={styles.root}>
        <StatusBar hidden />
        <Table ref={tableRef} G={G} ctx={ctx} {...rest} />
        <View
          style={{
            position: "absolute",
            top: Math.max(insets.top, 16),
            left: Math.max(insets.left, 16),
          }}
        >
          {Object.keys(G.players).map((playerIndex) => (
            <Nameplate
              key={playerIndex}
              player={playerIndex}
              players={G.players}
              currentPlayer={ctx.currentPlayer}
            />
          ))}
        </View>
        <Deck
          cards={G.deck}
          onCardDrop={onCardDrop}
          style={{
            position: "absolute",
            bottom: Math.max(insets.bottom + cardHeight, 16 + cardHeight),
            left: Math.max(insets.left, 16),
          }}
        />
        <Button
          onPress={onGamePass}
          style={{
            position: "absolute",
            bottom: Math.max(insets.bottom, 16),
            right: Math.max(insets.right, 16),
          }}
        >
          PASS
        </Button>
        <CircleButton
          onPress={() => setShowMenu(true)}
          style={{
            position: "absolute",
            top: Math.max(insets.top, 16),
            right: Math.max(insets.right, 16),
          }}
        >
          ?
        </CircleButton>
      </View>
      {ctx.gameover ? (
        <Victory
          backToMainMenu={backToMainMenu}
          player={ctx.gameover}
          players={G.players}
        />
      ) : null}
      <Menu
        player={ctx.currentPlayer}
        backToMainMenu={backToMainMenu}
        isVisible={showMenu}
        hide={() => setShowMenu(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Matchimals;
