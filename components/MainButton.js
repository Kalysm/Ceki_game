import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const MainButton = ({
  onPress,
  buttonTitle,
  viewStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  return (
    <View style={[styles.buttonContainer, viewStyle]}>
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[styles.textButton, buttonTextStyle]}>{buttonTitle}</Text>
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
    backgroundColor: "#4EEB83",
    width: 110,
    height: 30,
    margin: 5,
    borderRadius: 50,
  },
  textButton: {
    color: "black",
    fontSize: 15,
    fontFamily: "WendyOne",
  },
});

export default MainButton;
