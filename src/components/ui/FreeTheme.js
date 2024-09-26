import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MainButton from "./buttons/MainButton";
import { colorStyles } from "../../styles/globalStyles";

const FreeTheme = () => {
  return (
    <View style={styles.freeContainer}>
      <View style={styles.freeContent}>
        <View style={styles.freeImageContainer}>
          <Image
            source={require("../../../assets/images/free.png")}
            style={styles.freeImage}
          />
        </View>

        <Text style={styles.freeDescriptionText}>
          Test le thème gratuit avec tous tes amis
        </Text>
        <MainButton buttonTitle="Go!" buttonTextStyle={{ fontSize: 28 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  freeContainer: {
    alignItems: "center",
    backgroundColor: colorStyles.dark,
  },
  freeContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1E2F",
    width: "96%",
    height: 170,
    borderRadius: 22,
    marginTop: 10,
  },
  freeImageContainer: {
    marginBottom: 10,
  },
  freeImage: {
    height: 53,
    width: 227,
  },
  freeDescriptionText: {
    fontFamily: "LeagueSpartan",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
    color: "white",
  },
});

export default FreeTheme;
