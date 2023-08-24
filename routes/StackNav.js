import React from "react";
import GameScreen from "../screens/GameScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreens from "../screens/SettingsScreens";
import CategoriesScreen from "../screens/CategoriesScreen";
import ScoreScreen from "../screens/ScoreScreen";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={CategoriesScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Settings" component={SettingsScreens} />
      <Stack.Screen name="Score" component={ScoreScreen} />
    </Stack.Navigator>
  );
};

export default StackNav;
