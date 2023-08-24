import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Header from "../components/Header";
import FlippingCard from "../components/FlippingCard";
import { LinearGradient } from "expo-linear-gradient";
import RandomThemeButton from "../components/RandomThemeButton";
import { allCategories } from "../data/categories";

const CategoriesScreen = () => {
  const freeTheme = [
    {
      title: "Thème Gratuit!",
      theme: "Gratuit",
      imageUrl: require("../assets/creature3.jpg"),
      gameplay: "deviner",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("deviner");

  const filteredCategories = activeFilter
    ? allCategories.filter((category) => category.gameplay === activeFilter)
    : allCategories;

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    // Ajoutez un gestionnaire pour réinitialiser l'orientation lorsque l'écran est affiché
    lockScreenOrientation();

    // Assurez-vous de déverrouiller l'orientation lorsque l'écran est quitté
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#1F1F1F", "#1F1F1F"]}
        end={{ x: 1, y: 2.3 }}
        style={styles.background}
      >
        <StatusBar backgroundColor={"#1F1F1F"} />

        <Header />

        <RandomThemeButton />

        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "deviner" && styles.activeFilterButton,
            ]}
            onPress={() => setActiveFilter("deviner")}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === "deviner" && styles.activeFilterButtonText,
              ]}
            >
              Deviner
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "mimer" && styles.activeFilterButton,
            ]}
            onPress={() => setActiveFilter("mimer")}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === "mimer" && styles.activeFilterButtonText,
              ]}
            >
              Mimer
            </Text>
          </TouchableOpacity>
        </View>
        {activeFilter === "deviner" ? (
          <TouchableOpacity style={styles.freeThemeContainer}>
            <Text style={styles.freeThemeText}>{freeTheme[0].title}</Text>
          </TouchableOpacity>
        ) : null}

        <FlatList
          data={filteredCategories}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <FlippingCard
                title={item.title}
                theme={item.theme}
                gameplay={item.gameplay}
                imageUrl={item.imageUrl}
                style={styles.card}
              />
            </View>
          )}
          keyExtractor={(item) => item.theme}
          numColumns={3}
          contentContainerStyle={styles.listContent}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: "black",
  },
  filterButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "WendyOne",
  },
  activeFilterButtonText: {
    fontSize: 20,
    color: "#009700",
    fontFamily: "WendyOne",
  },
  freeThemeContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginVertical: 10,
    backgroundColor: "#009700",
  },
  freeThemeText: {
    color: "white",
    fontFamily: "WendyOne",
    fontSize: 25,
  },
  itemContainer: {
    marginVertical: 5,
    flex: 1,
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 260,
  },
});

export default CategoriesScreen;
