import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colorStyles } from "../../../styles/globalStyles";

const FilterButton = ({ route, tabIndex, index, onPress }) => {
  const isFocused = index === tabIndex;

  return (
    <TouchableOpacity onPress={onPress} style={styles.filterButton}>
      <Text
        style={[
          styles.filterTitle,
          { color: isFocused ? colorStyles.pinky : "white" },
        ]}
      >
        {route.title}
      </Text>
      {isFocused && <View style={styles.filterUnderline} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: colorStyles.dark,
  },
  filterTitle: {
    fontFamily: "LeagueSpartan",
    fontSize: 16,
    marginLeft: 18,
    marginBottom: 3,
  },
  filterUnderline: {
    height: 2,
    backgroundColor: colorStyles.pinky,
    width: "12%",
    marginLeft: 20,
    borderRadius: 2,
  },
});

export default FilterButton;
