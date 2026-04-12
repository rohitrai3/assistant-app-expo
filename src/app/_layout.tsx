import { Slot, Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Roboto-Mono": require("../../assets/fonts/RobotoMono-Regular.ttf"),
  });

  return <Slot />;
}
