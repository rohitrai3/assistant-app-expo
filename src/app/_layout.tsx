import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { KeyboardAvoidingView, KeyboardProvider } from "react-native-keyboard-controller";
import StatusBar from "@/components/StatusBar";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "RobotoMono": require("../../assets/fonts/RobotoMono-Regular.ttf"),
    "RobotoMono-Bold": require("../../assets/fonts/RobotoMono-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <KeyboardProvider>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior="padding"
      >
        <StatusBar />
        <Slot />
      </KeyboardAvoidingView>
    </KeyboardProvider >
  );

}

