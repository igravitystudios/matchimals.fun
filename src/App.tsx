import React, { useCallback, useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Client } from "boardgame.io/react-native";
import { colors } from "./constants/colors";

import Matchimals from "./Matchimals";
import { createGame } from "./Matchimals/game";
import type { GameMode } from "./Matchimals/game";
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

  const [gameMode, setGameMode] = React.useState<GameMode>("kids");
  const { getItem: getAsyncGameMode, setItem: setAsyncGameMode } =
    useAsyncStorage("gameMode");

  // Hydrate the last-chosen mode once on mount (defaults to kids)
  useEffect(() => {
    getAsyncGameMode().then((storedMode) => {
      if (storedMode === "kids" || storedMode === "classic") {
        setGameMode(storedMode);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetGameMode = useCallback(
    (mode: GameMode) => {
      setGameMode(mode);
      setAsyncGameMode(mode);
    },
    [setAsyncGameMode]
  );

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
    game: createGame(gameMode),
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
                  <MainMenu
                    startGame={startGame}
                    gameMode={gameMode}
                    setGameMode={handleSetGameMode}
                  />
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
