import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const MainButton = ({ onPress, buttonTitle }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.textButton}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F09B1C",
    paddingVertical: 20,
    width: 180,
    marginHorizontal: 5,
  },
  textButton: {
    color: "white",
    fontSize: 20,
    fontFamily: "WendyOne",
  },
});

export default MainButton;
