import BackendEndpoints from "@/components/BackendEndpoints";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-end",
        padding: 12,
        backgroundColor: "black",
      }}
    >
      <Text
        style={{
          fontFamily: "RobotoMono-Bold",
          color: "white",
          fontSize: 72,
          marginBottom: 48,
        }}
      >
        Settings
      </Text>
      <BackendEndpoints />
    </SafeAreaView>
  );

}

