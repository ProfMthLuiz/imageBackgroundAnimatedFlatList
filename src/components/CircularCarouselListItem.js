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
export const ListItemWidth = windowWidth / 3;

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
        ListItemWidth / 10,
        ListItemWidth / 2,
        ListItemWidth / 10,
        0,
      ];

      const opacityOutputRange = [0.3, 0.4, 1, 0.4, 0.3];
      const scaleOutputRange = [0.5, 0.7, 1.1, 0.7, 0.5];

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
          { translateX: ListItemWidth / 14 + ListItemWidth },
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
            aspectRatio: 0.75,
            shadowColor: "#ff0000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 30,
            elevation: 5,
          },
        ]}
      >
        <Image
          source={imageSrc}
          style={{
            flex: 1,
            margin: 5,
            borderRadius: 20,
          }}
        />
      </Animated.View>
    );
  }
);

export default CircularCarouselListItem;
