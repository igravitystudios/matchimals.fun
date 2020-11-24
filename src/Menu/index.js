import React from "react";
import { Platform } from "react-native";

import { colors } from "../constants/colors";
import { DevTools } from "./DevTools";
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

      {global?.__DEV__ ? <DevTools moves={moves} /> : null}
    </Dialog>
  );
};

export default Menu;
