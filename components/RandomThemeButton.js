import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  PanResponder,
} from "react-native";
import FlippingCard from "./FlippingCard";
import { allCategories } from "../data/categories";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import MainButton from "./MainButton";
import { useNavigation } from "@react-navigation/native";

const RandomThemeButton = () => {
  const navigation = useNavigation();

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
    inputRange: [0, 0.5],
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
      setRandomTheme(getRandomTheme());

      // Définissez une animation de rotation sur 360 degrés (une rotation complète) pendant 3 secondes.
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        // L'animation est terminée, permettez à l'utilisateur de retourner la carte.
        setIsRotating(false);
        rotateValue.setValue(0);
      });
    }
  };

  return (
    <View style={styles.randomThemeContainer}>
      <TouchableOpacity onPress={onPress} style={styles.randomThemeButton}>
        <Image
          source={require("../assets/box.png")}
          style={styles.randomBoxHeader}
        />
      </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(isVisible === false);
                  if (!isVisible) {
                    resetTranslateY();
                  }
                }}
                style={{
                  width: 70,
                  alignItems: "center",
                }}
              >
                <Entypo
                  name="cross"
                  size={30}
                  color="white"
                  style={{ padding: 10 }}
                />
              </TouchableOpacity>

              {isVisible && (
                <Animated.View
                  style={{
                    transform: [{ rotate: rotate }],
                    marginTop: -60,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={onRandomPress}>
                    <Image
                      source={require("../assets/random_modal_box.png")}
                      style={[styles.randomBox]}
                    />
                  </TouchableOpacity>
                </Animated.View>
              )}

              <FlippingCard
                imageUrl={require("../assets/questionmark.png")}
                isRotating={isRotating}
                isVisible={isVisible}
                randomTheme={randomTheme}
                style={{ marginTop: -20 }}
              />

              {!isRotating && (
                <>
                  {/* <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={onRandomPress}>
                        <AntDesign name="reload1" size={49} color="white" />
                      </TouchableOpacity>
                    </View> */}
                  <MainButton
                    buttonTitle="Jouer"
                    viewStyle={{
                      marginVertical: 173,
                    }}
                    buttonStyle={{ height: 50, width: 150 }}
                    buttonTextStyle={{ fontSize: 27 }}
                    onPress={() => {
                      navigation.navigate("Game", {
                        categoryName: randomTheme.theme,
                        // gameplay: randomTheme.gameplay,
                      });
                      setIsVisible(!isVisible);
                      if (!isVisible) {
                        resetTranslateY();
                      }
                    }}
                  />
                </>
              )}
            </View>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  randomThemeContainer: {
    alignItems: "center",
  },
  randomThemeButton: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10,
  },
  randomBoxHeader: {
    height: 60,
    width: 60,
  },
  randomBox: {
    height: 155,
    width: 155,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "black",
    height: 370,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  // iconContainer: {
  //   alignItems: "flex-end",
  //   marginRight: 20,
  //   marginTop: 50,
  // },
});

export default RandomThemeButton;
