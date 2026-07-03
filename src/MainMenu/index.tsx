import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import TriangleBackground from "./trianglify.png";
import { colors } from "../constants/colors";
import Button from "../Button";
import PlayerButton from "../PlayerButton";
import { useMusic } from "../Music";
import Logo from "../Logo";
import Toggle from "../Toggle";
import type { GameMode } from "../Matchimals/game";

const modeCaptions: Record<GameMode, string> = {
  easy: "Always a match to make",
  classic: "Match if you can, pass if not",
};

const Menu = ({
  startGame,
  gameMode,
  setGameMode,
}: {
  startGame: (numPlayers: number) => void;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
}) => {
  const music = useMusic();
  const insets = useSafeAreaInsets();

  // Fade the caption back in whenever the mode (and its text) changes
  const captionOpacity = useSharedValue(0);
  useEffect(() => {
    captionOpacity.value = 0;
    captionOpacity.value = withTiming(1, { duration: 350 });
  }, [gameMode, captionOpacity]);

  const captionStyle = useAnimatedStyle(() => ({
    opacity: captionOpacity.value,
  }));

  return (
    <ImageBackground source={TriangleBackground} style={styles.root}>
      <>
        <Logo width={306} height={60} style={{ marginBottom: 48 }} />
        <Text style={styles.text}>HOW MANY PLAYERS?</Text>
        <View
          style={{
            width: 280,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <PlayerButton
            number={1}
            onPress={() => {
              startGame(1);
            }}
            style={{ margin: 6 }}
          />
          <PlayerButton
            number={2}
            onPress={() => {
              startGame(2);
            }}
            style={{ margin: 6 }}
          />
          <PlayerButton
            number={3}
            onPress={() => {
              startGame(3);
            }}
            style={{ margin: 6 }}
          />
          <PlayerButton
            number={4}
            onPress={() => {
              startGame(4);
            }}
            style={{ margin: 6 }}
          />
        </View>

        <Toggle
          options={[
            { label: "EASY MODE", value: "easy" },
            { label: "CLASSIC", value: "classic" },
          ]}
          value={gameMode}
          onChange={setGameMode}
          style={{ marginTop: 24 }}
        />
        <Reanimated.Text style={[styles.caption, captionStyle]}>
          {modeCaptions[gameMode]}
        </Reanimated.Text>

        {music && (
          <Button
            onPress={() => music?.setPaused(!music?.paused)}
            style={{
              position: "absolute",
              bottom: Math.max(insets.bottom, 8),
              right: Math.max(insets.right, 8),
            }}
          >
            {music?.paused ? "TURN MUSIC ON" : "TURN MUSIC OFF"}
          </Button>
        )}
      </>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 8,
  },
  active: {
    borderColor: "blue",
  },
  text: {
    color: colors.grayDark,
    fontFamily: "Dimbo",
    fontSize: 48,
    lineHeight: 60,
    marginBottom: 32,
  },
  caption: {
    // Muted vs the heading — the animated fade owns the opacity prop
    color: colors.grayMedium,
    fontFamily: "Dimbo",
    fontSize: 22,
    lineHeight: 28,
    marginTop: 12,
    width: 320,
    // Both captions are single-line; fixed height keeps the layout stable
    height: 28,
    textAlign: "center",
  },
});

export default Menu;
