import React from "react";
import { Platform, View } from "react-native";

import { colors } from "../constants/colors";
import { DevTools } from "./DevTools";
import Button from "../Button";
import Dialog from "../Dialog";
import { useMusic } from "../Music";
import Logo from "../Logo";

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
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          marginTop: -16,
        }}
      >
        <Logo width={240} height={72} />
      </View>
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
