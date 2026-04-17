import ConversationView from "@/components/ConversationView";
import PromptInput from "@/components/PromptInput";
import { GRAY } from "@/utils/constants";
import { state$ } from "@/utils/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";

export default function Conversation() {
  const router = useRouter();
  // let socket = io(process.env.EXPO_PUBLIC_BACKEND_URL_1);
  useEffect(() => {
    if (!state$.username.get()) router.navigate("/");
    if (!state$.backend.get()) router.navigate("/settings");
  });
  // socket.on("connect_error", (err) => {
  //   console.log("Socket error, fallback:", err);
  //   socket = io(process.env.EXPO_PUBLIC_BACKEND_URL_2);
  // });
  // socket.on("connect", () => console.log("Socket connected"));
  // socket.on("disconnect", (res) => console.log("Socket disconnected:", res));

  function onPress() {
    router.navigate("/settings");
  }
  // <ConversationView socket={socket} />
  // <PromptInput socket={socket} />
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        gap: 24,
      }}>

      </KeyboardAvoidingView>
    </SafeAreaView >
  );

}

