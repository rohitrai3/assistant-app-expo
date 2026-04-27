import BackendEndpoints from "@/components/BackendEndpoints";
import SignOut from "@/components/LogOut";
import TtsSettings from "@/components/TtsSettings";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }} edges={["bottom"]}>
      <ScrollView>
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
        <TtsSettings />
      </ScrollView>
    </SafeAreaView>
  );

}

