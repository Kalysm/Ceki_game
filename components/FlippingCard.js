import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import MainButton from "./MainButton";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

const FlippingCard = ({ imageUrl, title, theme, gameplay }) => {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const rotationY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleCardPress = () => {
    const toValue = isFlipped ? 0 : 1;

    Animated.timing(animatedValue, {
      toValue,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCardPress}>
        <Animated.View
          style={[styles.category, { transform: [{ rotateY: rotationY }] }]}
        >
          {isFlipped ? (
            <View style={[styles.card, styles.cardBack]}>
              <MainButton
                onPress={() => {
                  navigation.navigate("Game", {
                    categoryName: theme,
                    gameplay: gameplay,
                  });
                }}
                buttonTitle="Jouer"
              />
            </View>
          ) : (
            <View style={styles.imageBackground}>
              <Image source={imageUrl} style={styles.image} />
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#1E1E1E",
    borderStyle: "solid",
    borderRadius: 1,
    width: 180,
    height: 250,
    overflow: "hidden",
  },
  cardContainer: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#1E1E1E",
    borderStyle: "solid",
    borderRadius: 1,
    width: 150,
    height: 220,
    perspective: 1000,
  },
  card: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cardBack: {
    backgroundColor: "black",
    transform: [{ rotateY: "180deg" }],
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 2,
  },
  image: {
    width: 180,
    height: 250,
    position: "absolute",
  },
  title: {
    fontSize: 23,
    fontFamily: "WendyOne",
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default FlippingCard;
