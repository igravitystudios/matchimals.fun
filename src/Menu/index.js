import React, { useContext } from "react";
import { Platform } from "react-native";

import colors from "../constants/colors";
import Button from "../Button";
import Dialog from "../Dialog";
import { useMusic } from "../Music";

const Menu = ({ backToMainMenu, hide, isVisible, player }) => {
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
          style={{ marginBottom: 64 }}
        >
          {music?.paused ? "🔇 " : "🔈 "} MUSIC
        </Button>
      )}
      <Button
        color={colors.redLight}
        onPress={backToMainMenu}
        style={{ marginBottom: 32 }}
      >
        EXIT TO MAIN MENU
      </Button>
      <Button color="#fff" onPress={hide}>
        BACK TO GAME
      </Button>
    </Dialog>
  );
};

export default Menu;
