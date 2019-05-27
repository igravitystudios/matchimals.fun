import { AppRegistry, Platform } from "react-native";

import App from "./App";

if (Platform.OS === "android") {
  require("babel-polyfill");
}

AppRegistry.registerComponent("Matchimals", () => App);

if (Platform.OS === "web") {
  AppRegistry.runApplication("Matchimals", {
    rootTag: document.getElementById("root"),
  });
}
