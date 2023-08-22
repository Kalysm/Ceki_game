import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import MainButton from "./MainButton";

const ItemsCategory = ({ title, imageUrl }) => {
  const navigation = useNavigation();

  const [cardVisible, setCardVisible] = useState(false);

  const displayCard = () => {
    setCardVisible(true);
  };

  const closeCard = () => {
    setCardVisible(false);
  };

  return (
    <TouchableOpacity onPress={displayCard} style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground source={imageUrl} style={styles.imageBackground}>
          <Text style={styles.title}>{title}</Text>
        </ImageBackground>
      </View>
      <Modal visible={cardVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={imageUrl} style={styles.imageModal} />
            <Text style={styles.modalText}>{title}</Text>
            <View style={styles.buttonContainer}>
              <MainButton onPress={closeCard} buttonTitle="Retour" />

              <MainButton
                onPress={() => {
                  navigation.navigate("Game", { categoryName: title });
                  setCardVisible(false);
                }}
                buttonTitle="Jouer"
              />
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#1E1E1E",
    borderStyle: "solid",
    borderRadius: 1,
    width: 128,
    height: 183,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 2,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  title: {
    fontSize: 16,
    fontFamily: "WendyOne",
    color: "white",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#05151C",
  },
  imageModal: {
    width: windowWidth,
    height: windowHeight * 0.4,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    fontFamily: "WendyOne",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#ccc",
    padding: 35,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "WendyOne",
  },
});

export default ItemsCategory;
