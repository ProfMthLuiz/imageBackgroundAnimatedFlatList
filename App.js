import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import CircularCarousel from "./src/components/CircularCarousel";
import { Image } from "expo-image"; // Importação do expo-image

const data = [
  require("./src/assets/images/image_1.jpg"),
  require("./src/assets/images/image_2.jpg"),
  require("./src/assets/images/image_3.jpg"),
  require("./src/assets/images/image_4.jpg"),
  require("./src/assets/images/image_5.jpg"),
  require("./src/assets/images/image_6.jpg"),
  require("./src/assets/images/image_7.jpg"),
  require("./src/assets/images/image_8.jpg"),
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CircularCarousel data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
