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
import ItemsCategory from "../components/ItemsCategory";
import * as ScreenOrientation from "expo-screen-orientation";
import Header from "../components/Header";
import FlippingCard from "../components/FlippingCard";
import { LinearGradient } from "expo-linear-gradient";

const CategoriesScreen = () => {
  const allCategories = [
    {
      title: "Capitales du monde",
      theme: "CapitalesDuMonde",
      imageUrl: require("../assets/creature.jpg"),
      gameplay: "deviner",
    },
    {
      title: "Recettes",
      theme: "Recettes",
      imageUrl: require("../assets/creature2.jpg"),
      gameplay: "deviner",
    },
    {
      title: "Star Wars",
      theme: "Star Wars",
      imageUrl: require("../assets/creature3.jpg"),
      gameplay: "deviner",
    },
    {
      title: "Seigneur des anneaux",
      theme: "Seigneur des anneaux",
      imageUrl: require("../assets/creature2.jpg"),
      gameplay: "deviner",
    },
    {
      title: "musics",
      theme: "musics",
      imageUrl: require("../assets/creature.jpg"),
      gameplay: "mimer",
    },
    {
      title: "Voitures",
      theme: "Voitures",
      imageUrl: require("../assets/creature.jpg"),
      gameplay: "deviner",
    },
    {
      title: "Sport",
      theme: "Sport",
      imageUrl: require("../assets/creature.jpg"),
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

        {/* <View style={styles.listContainer}>
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
      </View> */}

        <FlatList
          data={filteredCategories}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <FlippingCard
                title={item.title}
                theme={item.theme}
                gameplay={item.gameplay}
                imageUrl={item.imageUrl}
              />
            </View>
          )}
          keyExtractor={(item) => item.theme}
          numColumns={2}
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
    marginBottom: 10,
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
    color: "#F09B1C",
    fontFamily: "WendyOne",
  },
  itemContainer: {
    marginVertical: 15,
    marginHorizontal: 15,
    flex: 1,
    padding: 2,
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 150, // Adjust this value as needed
  },
});

export default CategoriesScreen;
