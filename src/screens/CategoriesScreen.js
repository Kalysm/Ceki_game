import React, { useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Header from "../components/ui/Header";
import MyStatusBar from "../components/ui/MyStatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FilterTab from "../components/filters/FilterTab";
import { colorStyles } from "../styles/globalStyles";
import SwipableButton from "../components/ui/buttons/SwipableButton";
import MainButton from "../components/ui/buttons/MainButton";
import {
  orientations,
  useDeviceOrientation,
} from "../hooks/useDeviceOrientation";
import FreeTheme from "../components/ui/FreeTheme";

const CategoriesScreen = () => {
  const [activeFilter, setActiveFilter] = useState("deviner");

  // Verrouille l'orientation du téléphone
  useDeviceOrientation(orientations.PORTAIT);

  return (
    <SafeAreaProvider style={styles.container}>
      <MyStatusBar backgroundColor={colorStyles.dark} />

      <Header activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <SwipableButton />

      <FreeTheme />

      <FilterTab />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CategoriesScreen;
