import React from "react";
import GameScreen from "../screens/GameScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreens from "../screens/SettingsScreens";
import CategoriesScreen from "../screens/CategoriesScreen";
import ScoreScreen from "../screens/ScoreScreen";
import TestScreen from "../screens/TestScreen";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Score"
        component={ScoreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
