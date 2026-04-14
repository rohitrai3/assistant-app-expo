import { SplashScreen, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";
import Drawer from "expo-router/drawer";
import { USERNAME } from "@/utils/constants";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Roboto-Mono": require("../../assets/fonts/RobotoMono-Regular.ttf"),
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  async function loadUsername() {
    const username = await getItemAsync(USERNAME);

    if (username) {
      setIsLoggedIn(true);
      router.navigate("/conversation");
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }

    loadUsername();
  }, [loaded, error]);

  if (!loaded && !error) {

    return null;
  }

  return (
    <Drawer>
      <Drawer.Protected guard={isLoggedIn}>
        <Drawer.Screen name="conversation" />
      </Drawer.Protected>
    </Drawer>
  );

}

