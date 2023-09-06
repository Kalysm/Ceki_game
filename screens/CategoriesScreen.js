import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Header from "../components/Header";
import FlippingCard from "../components/FlippingCard";
import { allCategories } from "../data/categories";
import MyStatusBar from "../components/MyStatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const CategoriesScreen = () => {
  const [activeFilter, setActiveFilter] = useState("deviner");

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.DEFAULT
      );
    };

    // Ajoutez un gestionnaire pour réinitialiser l'orientation lorsque l'écran est affiché
    lockScreenOrientation();

    // Assurez-vous de déverrouiller l'orientation lorsque l'écran est quitté
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const filteredCategories = activeFilter
    ? allCategories.filter((category) => category.gameplay === activeFilter)
    : allCategories;

  return (
    <SafeAreaProvider style={styles.container}>
      <MyStatusBar backgroundColor={"black"} />
      <Header
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        style={{ zindex: 2 }}
      />

      <FlatList
        data={filteredCategories}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <FlippingCard
              title={item.title}
              theme={item.theme}
              imageUrl={item.imageUrl}
              punchline={item.punchline}
              style={styles.card}
            />
          </View>
        )}
        keyExtractor={(item) => item.theme}
        numColumns={3}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginVertical: 5,
    flex: 1,
    alignItems: "center",
  },
});

export default CategoriesScreen;
