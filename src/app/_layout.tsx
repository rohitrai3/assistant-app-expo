import { Slot, SplashScreen, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { getItemAsync } from "expo-secure-store";
import { USERNAME } from "@/utils/constants";
import StatusBar from "@/components/StatusBar";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "RobotoMono": require("../../assets/fonts/RobotoMono-Regular.ttf"),
    "RobotoMono-Bold": require("../../assets/fonts/RobotoMono-Bold.ttf"),
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
    <>
      <StatusBar />
      <Slot />
    </>
  );

}

