import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import { Image } from "expo-image";

const ScoreScreen = ({ navigation }) => {
  const route = useRoute();
  const { categoryName, gameplay } = route.params;
  const { wonWords, lostWords } = route.params;

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    lockScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const finalScore = wonWords.length;
  console.log(categoryName);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/creature3.jpg")}
        style={styles.background}
      />
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
      <FontAwesome
        name="arrow-left"
        size={24}
        color="white"
        style={{ paddingLeft: 15 }}
        onPress={() => navigation.replace("Home")}
      />
      <View style={styles.logoContainer}>
        <View style={styles.finalScoreContainer}>
          <Text style={styles.finalScoreText}> {finalScore} pts </Text>
        </View>
        <View style={styles.ScoreContainer}>
          <Text style={styles.winText}>Gagnés:</Text>
          {wonWords.map((word, index) => (
            <Text style={styles.winText} key={index}>
              - {word}
            </Text>
          ))}
          <Text style={styles.lostText}>Perdu:</Text>
          {lostWords.map((word, index) => (
            <Text style={styles.lostText} key={index}>
              - {word}
            </Text>
          ))}
        </View>
      </View>
      <MainButton
        onPress={() =>
          navigation.replace("Game", {
            categoryName: categoryName,
            gameplay: gameplay,
          })
        }
        buttonTitle="Rejouer"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  logo: {
    width: 135,
    height: 50,
  },
  logoContainer: {
    alignItems: "center",
  },

  finalScoreContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#101010",
    marginTop: 25,
  },
  finalScoreText: {
    fontSize: 25,
    color: "white",
    fontFamily: "WendyOne",
  },
  ScoreContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    margin: 25,
    padding: 20,
    paddingHorizontal: 20,
  },
  winText: {
    color: "#009700",
    fontFamily: "WendyOne",
    fontSize: 20,
  },
  lostText: {
    color: "grey",
    fontFamily: "WendyOne",
    fontSize: 20,
  },
});

export default ScoreScreen;
