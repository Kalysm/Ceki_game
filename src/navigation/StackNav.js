import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import GameScreen from "../screens/GameScreen";
import SettingsScreens from "../screens/SettingsScreens";
import ScoreScreen from "../screens/ScoreScreen";
import TutorialScreen from "../screens/TutorialScreen";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={CategoriesScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Settings" component={SettingsScreens} />
      <Stack.Screen name="Score" component={ScoreScreen} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
    </Stack.Navigator>
  );
};

export default StackNav;
