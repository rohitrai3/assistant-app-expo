import ConversationView from "@/components/ConversationView";
import PromptInput from "@/components/PromptInput";
import { GRAY } from "@/utils/constants";
import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";

export default function Conversation() {
  const router = useRouter();
  let socket = io(process.env.EXPO_PUBLIC_BACKEND_URL_1);

  // socket.on("connect_error", (err) => {
  //   console.log("Socket error, fallback:", err);
  //   socket = io(process.env.EXPO_PUBLIC_BACKEND_URL_2);
  // });
  // socket.on("connect", () => console.log("Socket connected"));
  // socket.on("disconnect", (res) => console.log("Socket disconnected:", res));

  function onPress() {
    router.navigate("/settings");
  }

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
        <ConversationView socket={socket} />
        <PromptInput socket={socket} />
      </KeyboardAvoidingView>
    </SafeAreaView >
  );

}

