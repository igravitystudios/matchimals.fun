/* globals __DEV__ */
import React from "react";
import { Platform, View } from "react-native";

import colors from "../constants/colors";
import Button from "../Button";
import Dialog from "../Dialog";
import { useMusic } from "../Music";

const Menu = ({
  moves,
  backToMainMenu,
  hide,
  isVisible,
  player,
  scrollToCenter,
}) => {
  const music = useMusic();
  return (
    <Dialog
      player={player}
      isVisible={isVisible}
      hide={hide}
      style={{ maxWidth: 360 }}
    >
      {Platform.OS !== "web" && music && (
        <Button
          onPress={() => music?.setPaused(!music?.paused)}
          style={{ marginBottom: 24 }}
        >
          {music?.paused ? "TURN MUSIC ON" : "TURN MUSIC OFF"}
        </Button>
      )}
      <Button
        color={colors.greenLight}
        onPress={() => {
          scrollToCenter();
          hide();
        }}
        style={{ marginBottom: 24 }}
      >
        SCROLL TO CENTER
      </Button>
      <Button
        color={colors.redLight}
        onPress={backToMainMenu}
        style={{ marginBottom: 24 }}
      >
        EXIT TO MAIN MENU
      </Button>
      <Button color="#fff" onPress={hide}>
        BACK TO GAME
      </Button>
      {__DEV__ ? (
        <>
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={() => {
                moves.takeSnapshot();
              }}
            >
              Take Snapshot
            </Button>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Button
              onPress={() => {
                moves.restoreSnapshot("twoPlayerA");
              }}
            >
              A
            </Button>
            <Button
              onPress={() => {
                moves.restoreSnapshot("twoPlayerB");
              }}
            >
              B
            </Button>
            <Button
              onPress={() => {
                moves.restoreSnapshot("twoPlayerC");
              }}
            >
              C
            </Button>
            <Button
              onPress={() => {
                moves.restoreSnapshot("twoPlayerD");
              }}
            >
              D
            </Button>
            <Button
              onPress={() => {
                moves.restoreSnapshot("twoPlayerE");
              }}
            >
              E
            </Button>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Button
              onPress={() => {
                moves.restoreSnapshot("fourPlayerA");
              }}
            >
              A
            </Button>
            <Button
              onPress={() => {
                moves.restoreSnapshot("fourPlayerB");
              }}
            >
              B
            </Button>
            <Button
              onPress={() => {
                moves.restoreSnapshot("fourPlayerC");
              }}
            >
              C
            </Button>
            <Button
              onPress={() => {
                moves.restoreSnapshot("fourPlayerD");
              }}
            >
              D
            </Button>
            <Button
              onPress={() => {
                moves.restoreSnapshot("fourPlayerE");
              }}
            >
              E
            </Button>
          </View>
        </>
      ) : null}
    </Dialog>
  );
};

export default Menu;
