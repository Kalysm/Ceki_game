import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import MainButton from "../components/ui/buttons/MainButton";
import { Image } from "expo-image";
import { colorStyles } from "../styles/globalStyles";

const ScoreScreen = ({ navigation }) => {
  const route = useRoute();
  const { categoryName } = route.params;
  const { wonWords, lostWords } = route.params;

  const finalScore = wonWords.length;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
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
    marginTop: 35,
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
    fontFamily: "LeagueSpartan",
  },
  ScoreContainer: {
    borderRadius: 12,
    margin: 25,
    padding: 20,
    paddingHorizontal: 20,
  },
  winTextTitle: {
    color: colorStyles.greenWin,
    fontFamily: "LeagueSpartan",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },
  lostTextTitle: {
    color: colorStyles.redLose,
    fontFamily: "LeagueSpartan",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  winText: {
    color: colorStyles.greenWin,
    fontFamily: "LeagueSpartan",
    fontSize: 20,
    textAlign: "center",
  },
  lostText: {
    color: colorStyles.redLose,
    fontFamily: "LeagueSpartan",
    fontSize: 20,
    textAlign: "center",
  },
});

export default ScoreScreen;
