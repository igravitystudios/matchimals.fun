import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { ViewProps } from "react-native";
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { colors } from "../constants/colors";

const SEGMENT_WIDTH = 150;
const SEGMENT_HEIGHT = 56;
// The thumb is inset from the groove on all sides so the track shows around
// it — it reads as a chip sitting in the groove rather than a full panel
const THUMB_INSET = 5;

// Quick ease-out slide — a clean toggle-switch feel, no overshoot
const SLIDE = { duration: 220, easing: Easing.out(Easing.cubic) };

export interface ToggleOption<T extends string> {
  label: string;
  value: T;
}

interface ToggleProps<T extends string> extends ViewProps {
  options: [ToggleOption<T>, ToggleOption<T>];
  value: T;
  onChange: (value: T) => void;
}

const Toggle = <T extends string>({
  options,
  value,
  onChange,
  style,
  ...rest
}: ToggleProps<T>) => {
  const activeIndex = options[1].value === value ? 1 : 0;

  const translateX = useSharedValue(activeIndex * SEGMENT_WIDTH + THUMB_INSET);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      // Snap into place on mount without animating
      mounted.current = true;
      translateX.value = activeIndex * SEGMENT_WIDTH + THUMB_INSET;
      return;
    }
    translateX.value = withTiming(
      activeIndex * SEGMENT_WIDTH + THUMB_INSET,
      SLIDE
    );
  }, [activeIndex, translateX]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.track, style]} {...rest}>
      <View style={styles.trackInner}>
        <View style={styles.trackShadow} />
        <Reanimated.View style={[styles.thumb, thumbStyle]}>
          <View style={styles.thumbFace} />
        </Reanimated.View>
        {options.map((option) => (
          <Pressable
            key={option.value}
            style={styles.segment}
            onPress={() => onChange(option.value)}
          >
            <Text
              style={[
                styles.label,
                option.value !== value && styles.labelInactive,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.blueGrayLight,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#fff",
  },
  trackInner: {
    flexDirection: "row",
    borderWidth: 4,
    borderColor: colors.grayDark,
    borderRadius: 12,
    overflow: "hidden",
  },
  // A hard dark band along the top inside of the groove makes the track read
  // as recessed — the inverse of the thumb's bottom ledge, same top-light.
  trackShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: colors.blueGrayMedium,
  },
  // The thumb is a yellowDark base with the yellowLight face inset above it,
  // leaving a hard offset "ledge" at the bottom — the same cartoon depth as
  // the logo letters (no fuzzy shadows in this app).
  thumb: {
    position: "absolute",
    top: THUMB_INSET + 3,
    bottom: THUMB_INSET,
    width: SEGMENT_WIDTH - THUMB_INSET * 2,
    backgroundColor: colors.yellowDark,
    borderRadius: 7,
  },
  thumbFace: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 4,
    backgroundColor: colors.yellowLight,
    borderRadius: 7,
  },
  segment: {
    width: SEGMENT_WIDTH,
    height: SEGMENT_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Dimbo",
    fontSize: 26,
    color: colors.grayDark,
  },
  labelInactive: {
    opacity: 0.4,
  },
});

export default Toggle;
