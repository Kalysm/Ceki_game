import StackNav from "./routes/StackNav";
import { StatusBar, Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { TimeProvider } from "./components/TimeContext";
import theme from "./theme/theme";

// Personnalisez le thème par défaut de NavigationContainer avec votre thème personnalisé
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.darkBackground, // Utilisation de la couleur de fond sombre
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    WendyOne: require("./assets/fonts/WendyOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Chargement...</Text>;
  }
  return (
    <TimeProvider>
      <NavigationContainer theme={customTheme}>
        <StackNav />
      </NavigationContainer>
    </TimeProvider>
  );
}
