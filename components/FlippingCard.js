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

const FlippingCard = ({
  imageUrl,
  title,
  theme,
  gameplay,
  punchline,
  style,
  isRotating,
  isVisible,
  randomTheme,
}) => {
  const navigation = useNavigation();

  const [isFlipped, setIsFlipped] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleCardPress = () => {
    if (isRotating === false || isRotating === undefined) {
      if (!isVisible) {
        const toValue = isFlipped ? 0 : 1;

        Animated.timing(animatedValue, {
          toValue,
          duration: 70,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          setIsFlipped(!isFlipped);
        });
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={isVisible ? 1 : 0.2}
        onPress={() => {
          // Vérifiez si isVisible est faux avant de gérer le clic
          if (!isVisible) {
            handleCardPress();
          }
        }}
      >
        <Animated.View style={styles.category}>
          {isFlipped && !isVisible ? (
            <View style={styles.cardBack}>
              <Image source={imageUrl} style={styles.imageBack} />
              <View style={styles.textBackContainer}>
                <Text style={[styles.title, { fontSize: 19, marginTop: 8 }]}>
                  {punchline}
                </Text>
              </View>

              <MainButton
                onPress={() => {
                  navigation.navigate("Game", {
                    categoryName: theme,
                    gameplay: gameplay,
                  });
                }}
                buttonTitle="Jouer"
                viewStyle={{ marginBottom: 5 }}
                buttonStyle={{ height: 34, width: 100 }}
              />
            </View>
          ) : (
            !isFlipped &&
            !isVisible && (
              <View style={styles.card}>
                <Image source={imageUrl} style={styles.image} />
                <View style={styles.titleBg}>
                  <Text style={[styles.title, { marginTop: 5 }]}>{title}</Text>
                </View>
              </View>
            )
          )}

          {isVisible && !isRotating && (
            <View style={styles.card}>
              <Image source={randomTheme.imageUrl} style={styles.image} />
              <View style={styles.titleBg}>
                <Text style={styles.title}>{randomTheme.title}</Text>
              </View>
            </View>
          )}

          {isVisible && isRotating && (
            <View style={styles.card}>
              <Image source={randomTheme.imageUrl} style={styles.image} />
              <View style={styles.titleBg}>
                <Text style={styles.title}>{randomTheme.title}</Text>
              </View>
            </View>
          )}

          {isRotating && (
            <View style={styles.imageBackground}>
              <Image source={imageUrl} style={styles.randomImage} />
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
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    width: 116,
    height: 163,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderStyle: "solid",
    borderRadius: 4,
  },
  card: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
  },
  textBackContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  titleBg: {
    height: 45,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontFamily: "WendyOne",
    color: "white",
    textAlign: "center",
    paddingHorizontal: 4,
  },

  randomImage: {
    width: 116,
    height: 163,
    alignSelf: "center",
  },
});

export default FlippingCard;
