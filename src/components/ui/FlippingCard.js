import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from "react-native";
import MainButton from "../ui/buttons/MainButton";
import { useNavigation } from "@react-navigation/native";
import { colorStyles } from "../../styles/globalStyles";
import { Image } from "expo-image";
import { Audio } from "expo-av";

const FlippingCard = ({
  imageUrl,
  title,
  theme,
  cardColor,
  style,
  isRotating,
  randomModalVisible,
  randomTheme,
}) => {
  const navigation = useNavigation();

  const [isFlipped, setIsFlipped] = useState(false);
  const [sound, setSound] = useState();

  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleCardPress = () => {
    if (isRotating === false || isRotating === undefined) {
      if (!randomModalVisible) {
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

  const playSoundBlop = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/sounds/Valide.wav")
    );
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={randomModalVisible ? 1 : 0.2}
        onPress={() => {
          handleCardPress();
          playSoundBlop();
        }}
      >
        <Animated.View
          style={[styles.category, { backgroundColor: cardColor }]}
        >
          {isFlipped && !randomModalVisible ? (
            <View style={styles.cardBack}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Image source={imageUrl} style={styles.imageBack} />
              </View>

              <MainButton
                onPress={() => {
                  navigation.navigate("Game", {
                    categoryName: theme,
                  });
                }}
                buttonTitle="Go!"
                viewStyle={{ marginBottom: 5 }}
                buttonTextStyle={{ fontSize: 29 }}
              />
            </View>
          ) : (
            !isFlipped &&
            !randomModalVisible && (
              <View style={styles.card}>
                <View style={styles.titleBg}>
                  <Text style={[styles.title]}>{title}</Text>
                </View>
                <View style={styles.imgCard}>
                  <Image source={imageUrl} style={styles.image} />
                </View>
              </View>
            )
          )}

          {/* Partie RandomButton */}
          {randomModalVisible && !isRotating && (
            <View
              style={[styles.card, { backgroundColor: randomTheme.cardColor }]}
            >
              <View style={styles.titleBg}>
                <Text style={styles.title}>{randomTheme.title}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image source={randomTheme.imageUrl} style={styles.image} />
              </View>
            </View>
          )}

          {isRotating && (
            <View>
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
    backgroundColor: "rgba(255, 255, 255, 0.83)",
    width: 119,
    height: 161,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colorStyles.borderGrey,
    borderRadius: 13,
  },
  cardBack: {
    flex: 1,
  },
  imageBack: {
    height: 69,
    width: 69,
  },
  card: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "LeagueSpartan",
    color: "white",
    textAlign: "center",
    paddingHorizontal: 5,
    marginBottom: 5,
    marginTop: 15,
  },
  image: {
    width: 69,
    height: 69,
  },
  titleBg: {
    height: 65,
  },
  imgCard: {
    alignItems: "center",
    marginTop: -5,
  },
  randomImage: {
    width: 116,
    height: 163,
    alignSelf: "center",
  },
});

export default FlippingCard;
