import StackNav from "./routes/StackNav";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { TimeProvider } from "./components/TimeContext";
import theme from "./theme/theme";
import LoadingScreen from "./screens/LoadingScreen";

// Personnalisez le thème par défaut de NavigationContainer avec le thème personnalisé
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.darkBackground,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    WendyOne: require("./assets/fonts/WendyOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }
  return (
    <TimeProvider>
      <NavigationContainer theme={customTheme}>
        <StackNav />
      </NavigationContainer>
    </TimeProvider>
  );
}
