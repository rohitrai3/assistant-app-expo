import ConversationView from "@/components/ConversationView";
import PromptInput from "@/components/PromptInput";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";

export default function Index() {
  let socket = io(process.env.EXPO_PUBLIC_BACKEND_URL_1);
  socket.on("connect_error", (err) => {
    console.log("Socket error:", err);
    socket = io(process.env.EXPO_PUBLIC_BACKEND_URL_2);
  });
  socket.on("connect", () => console.log("Socket connected"));
  socket.on("disconnect", (res) => console.log("Socket disconnected:", res));

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        height: "100%",
      }}
    >
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

