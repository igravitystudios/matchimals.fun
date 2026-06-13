const { withDangerousMod } = require("expo/config-plugins");
const fs = require("fs");
const path = require("path");

const VARIABLE = "$RNFirebaseAnalyticsWithoutAdIdSupport=true";

// Use the AdId-free Firebase Analytics pod so the app doesn't link
// AdSupport.framework (keeps the App Store privacy declaration clean).
module.exports = function withFirebaseNoAdId(config) {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      const podfile = path.join(config.modRequest.platformProjectRoot, "Podfile");
      const contents = fs.readFileSync(podfile, "utf8");
      if (!contents.includes(VARIABLE)) {
        fs.writeFileSync(podfile, `${VARIABLE}\n${contents}`);
      }
      return config;
    },
  ]);
};
