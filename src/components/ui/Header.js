import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import RandomThemeButton from "./buttons/RandomThemeButton";
import { Entypo } from "@expo/vector-icons";
import { colorStyles } from "../../styles/globalStyles";

import { PanGestureHandler, State } from "react-native-gesture-handler";

const Header = () => {
  const navigation = useNavigation();
  const gestureHandlerRef = useRef(null);

  // const handleGestureEvent = (event) => {
  //   if (
  //     event.nativeEvent.state === State.END &&
  //     event.nativeEvent.translationX > 100
  //   ) {
  //     // Le seuil de glissement vers la droite a été atteint (ajustez-le selon vos besoins)
  //     Alert.alert("Bouton swipé", "Action déclenchée");
  //   }
  // };

  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.topContainer}>
        <View style={styles.randomContainer}>
          <RandomThemeButton />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <View style={styles.settingsContainer}>
            <Entypo name="menu" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorStyles.dark,
    height: 100,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2, // Android
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    marginTop: screenWidth * 0.04,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 98,
    height: 47,
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
});

export default Header;
