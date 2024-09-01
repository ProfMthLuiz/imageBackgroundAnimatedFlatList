import { Image } from "expo-image";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import React from "react";

const { width: windowWidth } = Dimensions.get("window");
export const ListItemWidth = windowWidth / 4;

const CircularCarouselListItem = React.memo(
  ({ contentOffset, imageSrc, index }) => {
    const rStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 2) * ListItemWidth,
        (index - 1) * ListItemWidth,
        index * ListItemWidth,
        (index + 1) * ListItemWidth,
        (index + 2) * ListItemWidth,
      ];

      const translateYOutputRange = [
        0,
        ListItemWidth / 4,
        ListItemWidth / 2,
        ListItemWidth / 4,
        0,
      ];

      const opacityOutputRange = [0.5, 0.9, 1, 0.9, 0.5];
      const scaleOutputRange = [0.5, 0.9, 1.2, 0.9, 0.5];

      const translateY = interpolate(
        contentOffset.value,
        inputRange,
        translateYOutputRange,
        Extrapolate.CLAMP
      );

      const opacity = interpolate(
        contentOffset.value,
        inputRange,
        opacityOutputRange,
        Extrapolate.CLAMP
      );

      const scale = interpolate(
        contentOffset.value,
        inputRange,
        scaleOutputRange,
        Extrapolate.CLAMP
      );

      return {
        opacity,
        transform: [
          { translateY },
          { translateX: ListItemWidth / 2 + ListItemWidth },
          { scale },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          rStyle,
          {
            width: ListItemWidth,
            aspectRatio: 1,
          },
        ]}
      >
        <Image
          source={imageSrc}
          style={{
            flex: 1,
            margin: 5,
            borderRadius: 200,
            borderWidth: 2,
            borderColor: "#fff",
          }}
        />
      </Animated.View>
    );
  }
);

export default CircularCarouselListItem;
