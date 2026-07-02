import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Portal } from "../Overlay";
import Animals from "../Animals";
import { usePlayerConfig } from "../hooks/players";

const Dialog = ({ children, isVisible, hide, player = 0, style }) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { playerConfig } = usePlayerConfig();
  const Icon = Animals[playerConfig[player].animal];
  const backgroundColor = playerConfig[player].color;

  // Keep the dialog mounted while it animates out, then unmount it. `progress`
  // drives both the backdrop fade and the card's slide-up via the native driver.
  const [mounted, setMounted] = useState(isVisible);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: isVisible ? 1 : 0,
      duration: isVisible ? 240 : 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished && !isVisible) {
        setMounted(false);
      }
    });
    return () => animation.stop();
  }, [mounted, isVisible, progress]);

  if (!mounted) {
    return null;
  }

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  return (
    <Portal>
      <Animated.View
        style={[styles.modal, { width, height, opacity: progress }]}
      >
        {/* Full-screen dismiss layer behind the card. Explicit width/height-
            absoluteFill collapses to zero inside the portal host. */}
        <TouchableOpacity
          activeOpacity={1} // No feedback, the dialog closing is the feedback
          onPress={hide}
          style={[styles.dismiss, { width, height }]}
        />
        <Animated.View
          style={[
            styles.dialog,
            {
              marginTop: insets.top + 60,
              marginBottom: insets.bottom,
              // Cap the card so tall content scrolls instead of overflowing
              // the screen (the web variant caps at calc(100vh - 120px)); the
              // extra 60 leaves room for the animal badge poking out the top.
              maxHeight: height - insets.top - insets.bottom - 120,
            },
            { transform: [{ translateY }] },
            style,
          ]}
        >
          <ScrollView contentContainerStyle={{ paddingTop: 60 }}>
            {children}
          </ScrollView>
          <View
            style={[
              styles.animal,
              { backgroundColor: backgroundColor || "gray" },
            ]}
          >
            <Icon width={80} height={80} />
          </View>
        </Animated.View>
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  // Explicit width/height (set inline from useWindowDimensions) instead of
  // absoluteFillObject's right/bottom: 0, which collapse to zero inside the
  // portal host. This view is both the (fading) backdrop and the centering
  // container.
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dismiss: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  dialog: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
  },
  animal: {
    position: "absolute",
    top: -60,
    left: "50%",
    marginLeft: -52, // account for border
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#fff",
  },
});

export default Dialog;
