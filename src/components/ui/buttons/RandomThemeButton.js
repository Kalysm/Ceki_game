import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  PanResponder,
} from "react-native";
import FlippingCard from "../FlippingCard";
import { thirdCategories } from "../../../constants/categories";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import MainButton from "./MainButton";
import { useNavigation } from "@react-navigation/native";
import { colorStyles } from "../../../styles/globalStyles";

const RandomThemeButton = () => {
  const navigation = useNavigation();

  const [randomModalVisible, setRandomModalVisible] = useState(false);
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
          setRandomModalVisible(false);
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
    const randomIndex = Math.floor(Math.random() * thirdCategories.length);
    return thirdCategories[randomIndex];
  };

  const [randomTheme, setRandomTheme] = useState(getRandomTheme());

  const rotate = rotateValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: ["0deg", "1440deg"], // Personnalisez la rotation ici.
  });

  const resetTranslateY = () => {
    translateY.setValue(0);
  };

  const onPress = () => {
    setRandomModalVisible(!randomModalVisible);
    onRandomPress();
    if (!randomModalVisible) {
      resetTranslateY();
    }
  };

  const onRandomPress = () => {
    if (!isRotating) {
      setIsRotating(true);

      // Définissez une animation de rotation
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        // L'animation est terminée
        setRandomTheme(getRandomTheme());
        setIsRotating(false);
        rotateValue.setValue(0);
      });
    }
  };

  return (
    <View style={styles.randomThemeContainer}>
      <TouchableOpacity onPress={onPress} style={styles.randomThemeButton}>
        <Image
          source={require("../../../../assets/box_random_header.png")}
          style={styles.randomBoxHeader}
        />
      </TouchableOpacity>
      <Modal
        visible={randomModalVisible}
        animationType="slide"
        transparent={true}
      >
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
                  setRandomModalVisible(randomModalVisible === false);

                  resetTranslateY();
                }}
                style={styles.crossButton}
              >
                <Entypo
                  name="cross"
                  size={30}
                  color={colorStyles.borderGrey}
                  style={{ padding: 10 }}
                />
              </TouchableOpacity>

              <Animated.View
                style={{
                  transform: [{ rotate: rotate }],
                  marginTop: -60,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={onRandomPress}>
                  <Image
                    source={require("../../../../assets/box_random.png")}
                    style={[styles.randomBox]}
                  />
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  Clique sur le dé pour choisir une catégorie au hasard
                </Text>
              </View>

              <FlippingCard
                imageUrl={require("../../../../assets/questionmark.png")}
                isRotating={isRotating}
                randomModalVisible={randomModalVisible}
                randomTheme={randomTheme}
                style={{ marginTop: -20 }}
              />

              {!isRotating && (
                <>
                  <MainButton
                    buttonTitle="Go!"
                    viewStyle={{
                      marginVertical: 173,
                    }}
                    buttonStyle={{ height: 54, width: 169 }}
                    buttonTextStyle={{ fontSize: 27 }}
                    onPress={() => {
                      navigation.navigate("Game", {
                        categoryName: randomTheme.theme,
                      });
                      setRandomModalVisible(!randomModalVisible);
                      if (!randomModalVisible) {
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
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "rgba(21, 23, 34, 0.98)",
    height: 393,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  crossButton: {
    width: 70,
    alignItems: "center",
  },
  descriptionContainer: {
    marginBottom: 30,
    marginHorizontal: 80,
    marginTop: -15,
  },
  randomBox: {
    height: 80,
    width: 80,
    marginVertical: 20,
  },
  descriptionText: {
    color: "white",
    fontFamily: "LeagueSpartan",
    fontSize: 16,
    textAlign: "center",
  },
});

export default RandomThemeButton;
