import React, { useCallback, useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BoardProps } from "boardgame.io/dist/types/src/client/react";

import { cardHeight, cardWidth, columns } from "../constants/board";
import Deck from "../Deck";
import type { CardDropMeasurements } from "../Card";
import Button from "../Button";
import CircleButton from "../CircleButton";
import Nameplate from "../Nameplate";
import Table from "../Table";
import type { TableHandle } from "../Table";
import Menu from "../Menu";
import Victory from "../Victory";
import { isLegalMove } from "./game";
import type { GameState } from "./game";
import { useMusic } from "../Music";

type MatchimalsProps = BoardProps<GameState> & {
  backToMainMenu: () => void;
};

const Matchimals = ({
  backToMainMenu,
  ctx,
  G,
  moves,
  ...rest
}: MatchimalsProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const music = useMusic();
  const tableRef = useRef<TableHandle>(null);
  const insets = useSafeAreaInsets();

  const onCardDrop = useCallback(
    (measurements: CardDropMeasurements) => {
      // The dragged card stays full screen-size while the board scales, so when
      // zoomed out the card visually covers several cells. Use the card's CENTER
      // (not its top-left corner) as the drop point so it lands where the player
      // aims regardless of zoom.
      const cardCenterLeft = measurements.pageX + measurements.width / 2;
      const cardCenterTop = measurements.pageY + measurements.height / 2;

      // Get the top left corner of the viewport in relation to the entire table
      const table = tableRef.current!;
      const tableLeft = table._previousLeft;
      const tableTop = table._previousTop;
      const scale = table._previousScale || 1;

      // Convert the card center from screen pixels back to board pixels (the
      // board is scaled by `scale` around its top-left origin, so 1 screen px ==
      // 1/scale board px), then find which cell contains that point.
      const boardLeft = Math.abs(tableLeft - cardCenterLeft) / scale;
      const boardTop = Math.abs(tableTop - cardCenterTop) / scale;

      const cellsFromLeft = Math.floor(boardLeft / cardWidth);
      const cellsFromTop = Math.floor(boardTop / cardHeight);

      // Calculate the target cell's id
      const targetCell = cellsFromTop * columns + cellsFromLeft;

      return new Promise<void>((resolve) => {
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
        moves={moves}
        player={ctx.currentPlayer}
        backToMainMenu={backToMainMenu}
        scrollToCenter={() => tableRef?.current?.scrollToCenter()}
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
