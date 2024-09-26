import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { useTime } from "../context/TimeContext";
import { FontAwesome } from "@expo/vector-icons";
import { colorStyles } from "../styles/globalStyles";

const SettingsScreens = ({ navigation }) => {
  const timeContext = useTime();
  const selectedDuration = timeContext.selectedDuration;

  const handleDurationSelect = (duration) => {
    timeContext.setSelectedDuration(duration);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome
        name="arrow-left"
        size={24}
        color="white"
        style={{ margin: 15 }}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.bigContainer}>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.textMenu}>Durée de la partie</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.durationButton]}
            onPress={() => handleDurationSelect(30)}
          >
            <Text
              style={[
                styles.textMenu,
                selectedDuration === 30 && styles.selectedButton,
              ]}
            >
              30s
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.durationButton]}
            onPress={() => handleDurationSelect(60)}
          >
            <Text
              style={[
                styles.textMenu,
                selectedDuration === 60 && styles.selectedButton,
              ]}
            >
              60s
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.durationButton]}
            onPress={() => handleDurationSelect(90)}
          >
            <Text
              style={[
                styles.textMenu,
                selectedDuration === 90 && styles.selectedButton,
              ]}
            >
              90s
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.textMenuContainer}>
          <Text style={styles.textMenu}>Partager avec tes amis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.textMenuContainer}
          onPress={() => navigation.navigate("Tutorial")}
        >
          <Text style={styles.textMenu}>Relire les règles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textMenuContainer}>
          <Text style={styles.textMenu}>Tik Tok</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textMenuContainer}>
          <Text style={styles.textMenu}>Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textMenuContainer}>
          <Text style={styles.textMenu}>CGU</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 35,
  },

  bigContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },

  textMenuContainer: {
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "black",
    width: 300,
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: 250,
    marginBottom: 5,
  },
  durationButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "black",
    borderRadius: 12,
    alignItems: "center",
  },
  logo: {
    width: 130,
    height: 50,
  },
  textMenu: {
    color: "white",
    marginVertical: 25,
    fontFamily: "LeagueSpartan",
    fontSize: 17,
  },
  selectedButton: {
    color: colorStyles.blueButton,
    fontSize: 23,
  },
});

export default SettingsScreens;
