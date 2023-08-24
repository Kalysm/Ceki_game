import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  PanResponder,
} from "react-native";
import FlippingCard from "./FlippingCard";
import { allCategories } from "../data/categories";
import { Ionicons } from "@expo/vector-icons";

const RandomThemeButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const rotateValue = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Déplacez la modal en fonction du geste
        if (gestureState.dy > 0) {
          // Permettez uniquement le glissement vers le bas (fermeture de la modal)
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // Fermez la modal si le geste atteint une certaine distance
          setIsVisible(false);
        } else {
          // Réinitialisez la position de la modal si le geste n'a pas atteint la distance de fermeture
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const getRandomTheme = () => {
    const randomIndex = Math.floor(Math.random() * allCategories.length);
    return allCategories[randomIndex];
  };

  const [randomTheme, setRandomTheme] = useState(getRandomTheme());

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1440deg"], // Vous pouvez personnaliser la rotation ici.
  });

  const resetTranslateY = () => {
    translateY.setValue(0);
  };

  const onPress = () => {
    setIsVisible(!isVisible);
    onRandomPress();
    if (!isVisible) {
      resetTranslateY();
    }
  };

  const onRandomPress = () => {
    if (!isRotating) {
      setIsRotating(true);

      // Définissez une animation de rotation sur 360 degrés (une rotation complète) pendant 3 secondes.
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 700,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        // L'animation est terminée, permettez à l'utilisateur de retourner la carte.
        setIsRotating(false);
        setRandomTheme(getRandomTheme());

        rotateValue.setValue(0);
      });
    }
  };

  console.log(`modal visible:`, isVisible);

  return (
    <View style={styles.randomThemeContainer}>
      <TouchableOpacity onPress={onPress} style={styles.randomThemeButton}>
        <Text style={styles.randomThemeText}>Aléatoire</Text>
        <Modal visible={isVisible} animationType="slide" transparent={true}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY: translateY }],
              },
            ]}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Animated.View
                  style={[
                    styles.flippingCard,
                    { transform: [{ rotate: rotate }] },
                  ]}
                >
                  <FlippingCard
                    imageUrl={require("../assets/questionmark.png")}
                    isRotating={isRotating}
                    isVisible={isVisible}
                  />
                </Animated.View>

                <View style={styles.icon}>
                  <Ionicons
                    name="ios-reload-circle"
                    size={60}
                    color="#009700"
                    onPress={onRandomPress}
                  />
                </View>
              </View>
            </View>
          </Animated.View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  randomThemeContainer: {
    alignItems: "center",
  },
  randomThemeButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 200,
    marginBottom: 10,
    backgroundColor: "lightblue",
    borderRadius: 30,
  },
  randomThemeText: {
    color: "white",
    fontFamily: "WendyOne",
    fontSize: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: 500,
    height: 300,
    borderRadius: 8,
    backgroundColor: "#05151C",
    alignItems: "center",
  },
  flippingCard: {
    marginBottom: 35,
  },
  icon: {
    marginTop: "auto", // Positionne le bouton en bas de l'écran
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default RandomThemeButton;
