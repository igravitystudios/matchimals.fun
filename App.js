import { useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import App from "./src/App";

SplashScreen.preventAutoHideAsync();

export default function RootApp() {
  const [fontsLoaded] = useFonts({
    Dimbo: require("./assets/fonts/Dimbo.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <App />
    </View>
  );
}
