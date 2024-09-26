import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colorStyles } from "../../../styles/globalStyles";

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
    backgroundColor: colorStyles.blueButton,
    width: 101,
    height: 33,
    borderRadius: 9,
  },
  textButton: {
    color: "white",
    fontSize: 15,
    fontFamily: "WendyOne",
  },
});

export default MainButton;
