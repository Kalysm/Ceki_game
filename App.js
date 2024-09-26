import StackNav from "./src/navigation/StackNav";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { TimeProvider } from "./src/context/TimeContext";
import { colorStyles } from "./src/styles/globalStyles";
import LoadingIndicator from "./src/components/ui/LoadingIndicator";
import { View } from "react-native";

// Personnaliser le thème par défaut de NavigationContainer avec le thème personnalisé
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colorStyles.dark,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    WendyOne: require("./assets/fonts/WendyOne-Regular.ttf"),
    LeagueSpartan: require("./assets/fonts/LeagueSpartan-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colorStyles.dark,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <TimeProvider>
      <NavigationContainer theme={customTheme}>
        <StackNav />
      </NavigationContainer>
    </TimeProvider>
  );
}
