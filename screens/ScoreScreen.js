import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import { Image } from "expo-image";

const ScoreScreen = ({ navigation }) => {
  const route = useRoute();
  const { categoryName, gameplay } = route.params;
  const { wonWords, lostWords } = route.params;

  const finalScore = wonWords.length;

  return (
    <View style={styles.container}>
      <ScrollView>
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
            <Text style={styles.winTextTitle}>Gagnés</Text>
            {wonWords.map((word, index) => (
              <Text style={styles.winText} key={index}>
                {word}
              </Text>
            ))}
            <Text style={styles.lostTextTitle}>Passés</Text>
            {lostWords.map((word, index) => (
              <Text style={styles.lostText} key={index}>
                {word}
              </Text>
            ))}
          </View>
        </View>
        <MainButton
          buttonStyle={{ height: 50, width: 150 }}
          buttonTextStyle={{ fontSize: 27 }}
          onPress={() =>
            navigation.replace("Game", {
              categoryName: categoryName,
              // gameplay: gameplay,
            })
          }
          buttonTitle="Rejouer"
          style={{ marginBottom: 25 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 130,
    height: 50,
    marginTop: 30,
  },
  logoContainer: {
    alignItems: "center",
  },
  finalScoreContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#101010",
  },
  finalScoreText: {
    fontSize: 45,
    color: "white",
    fontFamily: "WendyOne",
  },
  ScoreContainer: {
    borderRadius: 12,
    margin: 25,
    padding: 20,
    paddingHorizontal: 20,
  },
  winTextTitle: {
    color: "#4EEB83",
    fontFamily: "WendyOne",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },
  lostTextTitle: {
    color: "#EB4E4E",
    fontFamily: "WendyOne",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  winText: {
    color: "#4EEB83",
    fontFamily: "WendyOne",
    fontSize: 20,
    textAlign: "center",
  },
  lostText: {
    color: "#EB4E4E",
    fontFamily: "WendyOne",
    fontSize: 20,
    textAlign: "center",
  },
});

export default ScoreScreen;
