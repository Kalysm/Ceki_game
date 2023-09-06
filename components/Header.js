import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import RandomThemeButton from "./RandomThemeButton";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ style }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, styles.shadow, style]}>
      <View
        style={[
          styles.topContainer,
          Platform.OS === "ios" && { marginTop: 20 },
        ]}
      >
        <View style={styles.randomContainer}>
          <RandomThemeButton />
        </View>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <View style={styles.settingsContainer}>
            <Ionicons name="ios-settings" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      {/* {activeFilter === "deviner" && (
        <TouchableOpacity style={styles.freeThemeContainer}>
          <Text style={styles.freeThemeText}>{freeTheme[0].title}</Text>
        </TouchableOpacity>
      )} */}

      {/* <View style={styles.filterButtonsContainer}>
        <TouchableOpacity
          style={[styles.filterButton]}
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
          style={[styles.filterButton]}
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
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    marginBottom: 5,
  },
  shadow: {
    shadowColor: "black", // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.5, // Opacité de l'ombre
    shadowRadius: 2, // Rayon de l'ombre
    elevation: 2, // Élévation pour Android
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 135,
    height: 50,
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    width: 90,
    alignItems: "center",
  },
  randomContainer: {
    alignItems: "center",
  },
  randomThemeText: {
    color: "white",
    fontFamily: "WendyOne",
    fontSize: 25,
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  filterButtonText: {
    fontSize: 16,
    color: "#A1A1A1",
    fontFamily: "WendyOne",
  },
  activeFilterButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "WendyOne",
  },
});

export default Header;
