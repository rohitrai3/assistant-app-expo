import ConversationView from "@/components/ConversationView";
import IconButton from "@/components/IconButton";
import PromptInput from "@/components/PromptInput";
import { state$ } from "@/utils/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Conversation() {
  const router = useRouter();

  function goToSettings() {
    router.navigate("/settings");
  }

  useEffect(() => {
    if (!state$.username.get()) router.navigate("/");
    if (!state$.activeEndpoint.get()) router.navigate("/settings");
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        flex: 1,
        gap: 24,
      }}
      edges={["right", "bottom", "left"]}
    >
      <View
        style={{
          display: "flex",
          alignItems: "flex-end",
          paddingRight: 12,
        }}
      >
        <IconButton name="settings" action={goToSettings} />
      </View>
      <ConversationView />
      <PromptInput />
    </SafeAreaView >
  );

}

