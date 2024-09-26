import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { colorStyles } from "../../styles/globalStyles";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colorStyles.blueButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingIndicator;
