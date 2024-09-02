import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import CircularCarouselListItem, {
  ListItemWidth,
} from "./CircularCarouselListItem";
import { useSharedValue } from "react-native-reanimated";
import React, { useState, useEffect } from "react";

const { width } = Dimensions.get("screen");

export default function CircularCarousel({ data }) {
  const [imgBackground, setImgBackground] = useState(data[0]);
  const contentOffset = useSharedValue(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleScrollEvent = React.useCallback(
    (event) => {
      const xOffset = event.nativeEvent.contentOffset.x;
      contentOffset.value = xOffset;

      const index = Math.round(xOffset / ListItemWidth);
      const newImage = data[index % data.length];

      if (newImage !== imgBackground) {
        setImgBackground(newImage);
      }
    },
    [contentOffset, imgBackground, data]
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Componente de fundo separado */}
      <ImageBackground
        source={imgBackground}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        blurRadius={10}
      >
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          pagingEnabled
          snapToInterval={ListItemWidth}
          keyExtractor={(_, index) => index.toString()}
          scrollEventThrottle={16} // 60FPS -> 16ms (1000 / 60fps)
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
              listener: handleScrollEvent,
            }
          )}
          contentContainerStyle={{
            paddingRight: 2 * ListItemWidth,
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{
            position: "absolute",
            top: 0,
            height: "50%",
            padding: 1,
          }}
          horizontal
          initialNumToRender={data.length} // Tenta renderizar todos os itens inicialmente
          maxToRenderPerBatch={data.length} // Permite renderizar todos os itens
          renderItem={({ item, index }) => (
            <CircularCarouselListItem
              contentOffset={contentOffset}
              imageSrc={item}
              index={index}
            />
          )}
        />
      </ImageBackground>
    </View>
  );
}
