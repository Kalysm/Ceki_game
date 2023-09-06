import React from "react";
import { StyleSheet, View, StatusBar, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MyStatusBar = ({ backgroundColor }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ heig: insets.top, backgroundColor }}>
      <StatusBar animated={true} backgroundColor={backgroundColor} hidden />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyStatusBar;
