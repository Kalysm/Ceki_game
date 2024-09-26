import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import MainButton from "../components/ui/buttons/MainButton";
import { Image } from "expo-image";

const TutorialScreen = ({ navigation }) => {
  const handleSkip = () => {
    navigation.navigate("Home");
  };

  return (
    <Swiper
      loop={false}
      dot={
        <View
          style={{
            backgroundColor: "grey",
            width: 8,
            height: 8,
            borderRadius: 4,
            margin: 3,
          }}
        />
      }
    >
      <View style={styles.titleContainer}>
        <View style={{ width: 300 }}>
          <Text style={styles.title}>
            Sélectionne la catégorie de ton choix
          </Text>
        </View>

        <Image
          source={require("../../assets/images/tutoriel/tuto_1.png")}
          style={{ height: 426, width: 430, marginTop: 30 }}
        />
        <View style={{ width: 300 }}>
          <Text style={styles.title}>Ou clique sur le bouton aléatoire!</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={{ width: 300 }}>
          <Text style={styles.title}>
            Fais deviner le mot qui s'affiche à l'écran
          </Text>
        </View>

        <Image
          source={require("../../assets/images/tutoriel/tuto_2.png")}
          style={{ height: 388, width: 216, marginVertical: 30 }}
        />
        <View style={{ width: 250 }}>
          <Text style={styles.title}>Gagne 1 point par bonne réponse</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={{ width: 300 }}>
          <Text style={styles.title}>Gagne un maximum de points</Text>
        </View>

        <Image
          source={require("../../assets/images/tutoriel/tuto_3.png")}
          style={{ height: 300, width: 300, marginTop: -60, marginBottom: -30 }}
        />
        <View style={{ width: 320 }}>
          <Text style={styles.title}>
            Incline ton smartphone vers le haut si tu as trouvé
          </Text>
        </View>
        <Image
          source={require("../../assets/images/tutoriel/tuto_3_bis.png")}
          style={{ height: 225, width: 225, marginBottom: -20 }}
        />
        <View style={{ width: 300 }}>
          <Text style={styles.title}>
            Ou vers le bas pour passer au mot suivant
          </Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={{ width: 300 }}>
          <Text style={styles.title}>Sélectionne la durée de tes parties</Text>
        </View>

        <Image
          source={require("../../assets/images/tutoriel/tuto_4.png")}
          style={{ height: "70%", width: 469, marginBottom: 20, marginTop: 10 }}
        />
        <MainButton
          buttonTitle="J'ai compris!"
          buttonTextStyle={{ textAlign: "center", fontSize: 15 }}
          buttonStyle={{
            marginTop: 10,
            height: 50,
            width: 150,
          }}
          onPress={handleSkip}
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "LeagueSpartan",
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});

export default TutorialScreen;
