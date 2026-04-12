import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Roboto-Mono": require("../../assets/fonts/RobotoMono-Regular.ttf"),
  });

  return <Stack />;
}
