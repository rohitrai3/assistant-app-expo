import BackendEndpoints from "@/components/BackendEndpoints";
import SignOut from "@/components/LogOut";
import { Text, View } from "react-native";
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
      <View style={{ alignItems: "flex-end" }}>
        <SignOut />
      </View>
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

