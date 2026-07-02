import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import type { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
import { usePlayerConfig } from "../hooks/players";
import { colors } from "../constants/colors";
import Animals from "../Animals";

interface PlayerButtonProps {
  number: number;
  onPress?: TouchableOpacityProps["onPress"];
  style?: StyleProp<ViewStyle>;
}

const PlayerButton = ({ number, onPress, style }: PlayerButtonProps) => {
  const { playerConfig } = usePlayerConfig();
  const PlayerIcons = Array(number)
    .fill(undefined)
    .map((n, i) => Animals[playerConfig[i]["animal"]]);

  const getIconSize = useCallback(
    function () {
      switch (number) {
        case 1: {
          return {
            width: 72,
            height: 72,
          };
        }
        case 2: {
          return {
            width: 44,
            height: 44,
          };
        }
        case 3: {
          return {
            width: 36,
            height: 36,
          };
        }
        case 4: {
          return {
            width: 36,
            height: 36,
          };
        }
        default: {
          return {
            width: 64,
            height: 64,
          };
        }
      }
    },
    [number]
  );
  const getBackgroundColor = useCallback(
    function () {
      switch (number) {
        case 1: {
          return colors.greenLight;
        }
        case 2: {
          return colors.blueLight;
        }
        case 3: {
          return colors.redLight;
        }
        case 4: {
          return colors.yellowLight;
        }
        default: {
          return colors.grayLight;
        }
      }
    },
    [number]
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={[
          styles.tag,
          {
            backgroundColor: getBackgroundColor(),
          },
          style,
        ]}
      >
        <View style={styles.tagInner}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {PlayerIcons.map((Icon, i) => (
              <Icon key={i} {...getIconSize()} style={{ margin: 4 }} />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  tagInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: colors.grayDark,
    borderRadius: 60,
  },
});

export default PlayerButton;
