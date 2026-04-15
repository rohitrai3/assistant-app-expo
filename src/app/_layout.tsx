import { Slot, SplashScreen, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { getItemAsync } from "expo-secure-store";
import { USERNAME } from "@/utils/constants";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Roboto-Mono": require("../../assets/fonts/RobotoMono-Regular.ttf"),
  });
  const router = useRouter();

  async function loadUsername() {
    const username = await getItemAsync(USERNAME);

    if (username) router.navigate("/conversation");
  }

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }

    loadUsername();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <Slot />
  );

}

