import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import FlippingCard from "../ui/FlippingCard";
import { colorStyles } from "../../styles/globalStyles";

const FilterView = ({ data }) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.flippingCardContainer}>
            <FlippingCard
              title={item.title}
              theme={item.theme}
              imageUrl={item.imageUrl}
              punchline={item.punchline}
              cardColor={item.cardColor}
            />
          </View>
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colorStyles.dark,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flippingCardContainer: {
    flex: 1,
    marginVertical: 5,
    alignItems: "center",
  },
});

export default FilterView;
