import React, { useCallback, useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Client } from "boardgame.io/react-native";
import { colors } from "./constants/colors";

import Matchimals from "./Matchimals";
import game from "./Matchimals/game";
import MainMenu from "./MainMenu";
import { MusicProvider } from "./Music";
import { PlayerProvider } from "./hooks/players";
import { OverlayProvider } from "./Overlay";

export default function App() {
  const [isMainMenuVisible, setIsMainMenuVisible] = React.useState(true);
  const [numPlayers, setNumPlayers] = React.useState(1);

  const [numGamesPlayed, setNumGamesPlayed] = React.useState("0");
  const { getItem: getAsyncNumGamesPlayed, setItem: setAsyncNumGamesPlayed } =
    useAsyncStorage("numGamesPlayed");

  const onMount = async () => {
    const asyncNumGamesPlayed = await getAsyncNumGamesPlayed();

    setNumGamesPlayed(asyncNumGamesPlayed ?? "0");
  };

  const handleIncrementGamesPlayed = useCallback(() => {
    const stringNumberWow = `${Number(numGamesPlayed) + 1}`;
    console.log("You are playing Game Number: " + stringNumberWow);
    setNumGamesPlayed(stringNumberWow);
    setAsyncNumGamesPlayed(stringNumberWow);
  }, [numGamesPlayed, setNumGamesPlayed, setAsyncNumGamesPlayed]);

  useEffect(() => {
    onMount();
  });

  const backToMainMenu = useCallback(() => {
    setIsMainMenuVisible(true);
  }, [setIsMainMenuVisible]);

  const startGame = useCallback(
    (numPlayers: number) => {
      setNumPlayers(numPlayers);
      setIsMainMenuVisible(false);
      handleIncrementGamesPlayed();
    },
    [handleIncrementGamesPlayed, setIsMainMenuVisible, setNumPlayers]
  );

  const MatchimalsClient = Client({
    board: Matchimals,
    game,
    numPlayers,
    debug: false,
  });

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <MusicProvider>
          <PlayerProvider>
            <OverlayProvider>
              <View style={styles.root}>
                <StatusBar hidden />
                {isMainMenuVisible ? (
                  <MainMenu startGame={startGame} />
                ) : (
                  <MatchimalsClient backToMainMenu={backToMainMenu} />
                )}
              </View>
            </OverlayProvider>
          </PlayerProvider>
        </MusicProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    position: "relative",
    width: "100%",
    // react-native-web supports viewport units; RN's style types don't.
    height: Platform.OS === "web" ? ("100vh" as unknown as number) : "100%",
    overflow: "hidden",
    backgroundColor: colors.grayDark,
  },
});
