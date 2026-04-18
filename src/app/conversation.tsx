import ConversationView from "@/components/ConversationView";
import PromptInput from "@/components/PromptInput";
import { GRAY } from "@/utils/constants";
import { state$ } from "@/utils/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Conversation() {
  const router = useRouter();

  function onPress() {
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
        <Pressable
          style={{
            backgroundColor: GRAY,
            padding: 12,
            borderRadius: 100,
          }}
          onPress={onPress}
        >
          <Image source={require("../../assets/images/settings.png")} />
        </Pressable>
      </View>
      <ConversationView />
      <PromptInput />
    </SafeAreaView >
  );

}

