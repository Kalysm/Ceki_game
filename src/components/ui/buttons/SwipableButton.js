import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Animated,
  Dimensions,
  Modal,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import MainButton from "./MainButton";
import ModalAllThemes from "../ModalAllThemes";

const SwipableButton = () => {
  const gestureHandlerRef = useRef(null);
  const buttonWidth = 100;
  const redBoxWidth = Dimensions.get("window").width / 2; // Largeur de la vue rouge

  const [modalVisible, setModalVisible] = useState(false);

  const translateX = useRef(new Animated.Value(0)).current;

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const handleGestureStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX > buttonWidth / 2) {
        // Le bouton a été swipé avec succès
        setModalVisible(true);

        // Réinitialiser la valeur de translateX à 0
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      } else {
        // Le bouton n'a pas été swipé avec succès, revenir à la position initiale
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    } else if (event.nativeEvent.translationX < 0) {
      // Limiter le déplacement à gauche à 0
      translateX.setValue(0);
    } else if (
      event.nativeEvent.translationX > 0 &&
      event.nativeEvent.translationX <= redBoxWidth - buttonWidth
    ) {
      // Limiter le déplacement à la largeur de la vue rouge moins la largeur du bouton
      translateX.setValue(event.nativeEvent.translationX);
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        ref={gestureHandlerRef}
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleGestureStateChange}
      >
        <Animated.View
          style={[
            styles.swipe,
            {
              transform: [{ translateX: translateX }],
              width: buttonWidth,
              zIndex: 2, // Place le bouton au-dessus du texte
            },
          ]}
        >
          <MainButton
            buttonTitle="Go!"
            buttonStyle={{ height: 50 }}
            buttonTextStyle={{ fontSize: 25 }}
          />
        </Animated.View>
      </PanGestureHandler>

      <Text
        style={{
          color: "white",
          fontFamily: "LeagueSpartan",
          fontSize: 20,
          marginLeft: 15,
          opacity: 0.2,
        }}
      >
        &gt;&gt;&gt;
      </Text>

      <View style={{ alignItems: "center", flex: 1, zIndex: 1 }}>
        <Text
          style={{ color: "white", fontFamily: "LeagueSpartan", fontSize: 15 }}
        >
          Débloquer tous les thèmes!
        </Text>
      </View>
      {modalVisible && (
        <ModalAllThemes onClose={() => setModalVisible(!modalVisible)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    width: "95%",
    borderRadius: 15,
    marginVertical: 5,
    marginLeft: 7,
  },
  swipe: {},
});

export default SwipableButton;
