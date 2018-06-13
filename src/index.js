import { AppRegistry, Platform } from "react-native";

import App from "./App";

if (Platform.OS === "android") {
  require("babel-polyfill");
}

AppRegistry.registerComponent("matchimals", () => App);

if (Platform.OS === "web") {
  AppRegistry.runApplication("matchimals", {
    rootTag: document.getElementById("root"),
  });
}
