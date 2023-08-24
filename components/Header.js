import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.topContainer}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <View style={styles.iconContainer}>
          <FontAwesome name="user" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  logo: {
    width: 135,
    height: 45,
    marginLeft: 25,
  },
  settingsButton: {
    justifyContent: "flex-end",
    marginRight: 25,
  },
  iconContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "black",
  },
});

export default Header;
