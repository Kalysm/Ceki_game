import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import ItemsCategory from "../components/ItemsCategory";
import * as ScreenOrientation from "expo-screen-orientation";
import Header from "../components/Header";

const CategoriesScreen = () => {
  const allCategories = [
    {
      title: "films",
      imageUrl: require("../assets/films.jpg"),
    },
    {
      title: "musics",
      imageUrl: require("../assets/musics.jpg"),
    },
    {
      title: "Harry",
      imageUrl: require("../assets/musics.jpg"),
    },
    {
      title: "Star wars",
      imageUrl: require("../assets/musics.jpg"),
    },
    {
      title: "Seigneur des anneaux",
      imageUrl: require("../assets/musics.jpg"),
    },
    {
      title: "Batman",
      imageUrl: require("../assets/musics.jpg"),
    },
    {
      title: "Spiderman",
      imageUrl: require("../assets/musics.jpg"),
    },
    {
      title: "Superman",
      imageUrl: require("../assets/musics.jpg"),
    },
    {
      title: "Thor",
      imageUrl: require("../assets/musics.jpg"),
    },
  ];

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    const detectAndLockPortrait = async () => {
      const orientationInfo = await ScreenOrientation.getOrientationAsync();
      if (orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
        lockScreenOrientation();
      }
    };

    detectAndLockPortrait(); // Call the function to check and lock on mount

    const orientationChangeListener =
      ScreenOrientation.addOrientationChangeListener((event) => {
        if (
          event.orientationLock === ScreenOrientation.Orientation.LANDSCAPE_LEFT
        ) {
          lockScreenOrientation();
        }
      });

    return () => {
      orientationChangeListener.remove(); // Clean up the subscription
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#05151C"} />
      <Header />
      <View style={styles.listContainer}>
        <FlatList
          data={allCategories}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <ItemsCategory title={item.title} imageUrl={item.imageUrl} />
            </View>
          )}
          keyExtractor={(item) => item.title}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    alignItems: "stretch",
  },
  itemContainer: {
    marginTop: 2,
    flex: 1,
    padding: 2,
    alignItems: "center", // Center items horizontally
  },
});

export default CategoriesScreen;
