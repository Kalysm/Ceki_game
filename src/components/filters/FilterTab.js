import React, { useState, useRef } from "react";
import {
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import FilterButton from "../ui/buttons/FilterButton";
import {
  FirstRoute,
  SecondRoute,
  ThirdRoute,
  FourthRoute,
} from "./FilterRoute";
import { colorStyles } from "../../styles/globalStyles";

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

export default FilterTab = ({ title }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Les plus populaires" },
    { key: "second", title: "Restons simples" },
    { key: "third", title: "On les adore" },
    { key: "fourth", title: "Ça se complique" },
  ]);

  const scrollViewRef = useRef(null);

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    // Calculer la position de défilement de la barre des onglets pour centrer l'onglet sélectionné
    const tabWidth = layout.width / routes.length;
    const scrollX = newIndex * tabWidth - layout.width / 2 + tabWidth * 2.12;
    scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
  };

  return (
    <>
      <TabView
        style={{ backgroundColor: colorStyles.dark }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        tabBarStyle={{ flexDirection: "row" }}
        renderTabBar={(props) => (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.tabContainer}
              ref={scrollViewRef}
            >
              {props.navigationState.routes.map((route, tabIndex) => (
                <FilterButton
                  key={route.key}
                  route={route}
                  tabIndex={tabIndex}
                  index={index}
                  onPress={() => handleIndexChange(tabIndex)}
                />
              ))}
            </ScrollView>
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    maxHeight: 50,
    backgroundColor: colorStyles.dark,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginVertical: 10,
  },
});
