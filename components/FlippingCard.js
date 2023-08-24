import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from "react-native";
import MainButton from "./MainButton";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { allCategories } from "../data/categories";

const FlippingCard = ({
  imageUrl,
  title,
  theme,
  gameplay,
  style,
  isRotating,
  isVisible,
}) => {
  const navigation = useNavigation();

  const [isFlipped, setIsFlipped] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const rotationY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleCardPress = () => {
    if (isRotating === false || isRotating === undefined) {
      const toValue = isFlipped ? 0 : 1;

      Animated.timing(animatedValue, {
        toValue,
        duration: 250,
        easing: Easing.circle,
        useNativeDriver: true,
      }).start(() => {
        setIsFlipped(!isFlipped);
      });
    }
  };

  const getRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * allCategories.length);
    return allCategories[randomIndex];
  };

  const randomCategory = getRandomCategory();

  console.log(isFlipped);

  return (
    <View style={[styles.container, style]}>
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

          {isFlipped && isVisible && (
            <View style={styles.imageBackground}>
              <Image source={randomCategory.imageUrl} style={styles.image} />
              <Text
                style={[styles.title, { transform: [{ rotateY: "180deg" }] }]}
              >
                {randomCategory.title}
              </Text>
            </View>
          )}

          {isRotating && (
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
    width: 120,
    height: 160,
    overflow: "hidden",
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
  },
  image: {
    width: 120,
    height: 160,
    position: "absolute",
    borderWidth: 2,
    borderColor: "white",
    borderStyle: "solid",
    borderRadius: 3,
  },
  title: {
    fontSize: 15,
    fontFamily: "WendyOne",
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default FlippingCard;
