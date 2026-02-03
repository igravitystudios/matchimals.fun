export default {
  expo: {
    name: "Matchimals",
    slug: "matchimals",
    owner: "chrisheninger",
    version: "1.0.0",
    orientation: "default",
    icon: "./assets/app-icons/Icon-App-1024x1024.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      bundleIdentifier: "native.matchimals.fun",
      buildNumber: "1",
      supportsTablet: true,
      requireFullScreen: false,
      config: {
        usesNonExemptEncryption: false,
      },
      infoPlist: {
        UIStatusBarHidden: true,
        UIViewControllerBasedStatusBarAppearance: false,
        UISupportedInterfaceOrientations: [
          "UIInterfaceOrientationPortrait",
          "UIInterfaceOrientationPortraitUpsideDown",
          "UIInterfaceOrientationLandscapeLeft",
          "UIInterfaceOrientationLandscapeRight",
        ],
      },
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-font", "expo-audio"],
    extra: {
      eas: {
        projectId: "3ec2f1f1-6b38-475d-8aee-baeae6832cfe",
      },
    },
  },
};
