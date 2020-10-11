/* globals __DEV__ */
import React from "react";
import { Platform, View } from "react-native";

import colors from "../constants/colors";
import Button from "../Button";
import CircleButton from "../CircleButton";
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
        <View style={{ alignItems: "center", marginTop: 48 }}>
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
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("twoPlayerA");
              }}
            >
              2A
            </CircleButton>
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("twoPlayerB");
              }}
            >
              2B
            </CircleButton>
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("twoPlayerC");
              }}
            >
              2C
            </CircleButton>
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("twoPlayerD");
              }}
            >
              2D
            </CircleButton>
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("twoPlayerE");
              }}
            >
              2E
            </CircleButton>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("fourPlayerA");
              }}
            >
              4A
            </CircleButton>
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("fourPlayerB");
              }}
            >
              4B
            </CircleButton>
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("fourPlayerC");
              }}
            >
              4C
            </CircleButton>
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("fourPlayerD");
              }}
            >
              4D
            </CircleButton>
            <CircleButton
              onPress={() => {
                moves.restoreSnapshot("fourPlayerE");
              }}
            >
              4E
            </CircleButton>
          </View>
        </View>
      ) : null}
    </Dialog>
  );
};

export default Menu;
