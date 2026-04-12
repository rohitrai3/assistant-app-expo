import { PURPLE } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";

export default function Index() {
  const [prompt, setPrompt] = useState<string>("");
  const [userContents, setUserContents] = useState<string[]>([]);
  const [assistantThinkingContents, setAssistantThinkingContents] = useState<string[]>([]);
  const [assistantResponseContents, setAssistantResponseContents] = useState<string[]>([]);
  const [assistantToolNameContents, setAssistantToolNameContents] = useState<string[]>([]);
  const [assistantToolInputContents, setAssistantToolInputContents] = useState<string[]>([]);
  const [assistantThinking, setAssistantThinking] = useState<string>("");
  const [assistantResponse, setAssistantResponse] = useState<string>("");
  const [assistantToolName, setAssistantToolName] = useState<string>("");
  const [assistantToolInput, setAssistantToolInput] = useState<string>("");
  const socket = io(process.env.EXPO_PUBLIC_BACKEND_URL);

  function onPress() {
    console.log("prompt:", prompt);
    socket.emit("conversation.text", prompt);
  }

  useEffect(() => {
    let thinking = "";
    let response = "";
    let toolName = "";
    let toolInput = "";

    socket.on("user.message", res => {
      setUserContents(prev => [...prev, res]);
      console.log("user.message:", res);
    });

    socket.on("assistant.thinking.start", () => {
      thinking = "";
      console.log("assistnat.thinking.start");
    });

    socket.on("assistant.thinking", res => {
      thinking = thinking + res;
      setAssistantThinking(prev => prev + res);
      console.log("assistant.thinking:", res);
    });

    socket.on("assistant.response.start", () => {
      setAssistantThinkingContents(prev => [...prev, thinking]);
      setAssistantThinking("");
      console.log("assistant.response.start");
      response = "";
    });

    socket.on("assistant.response", (res) => {
      response = response + res;
      setAssistantResponse(prev => prev + res);
      console.log("assistant.response:", res);
    });

    socket.on("assistant.signature", () => {
      setAssistantResponseContents(prev => [...prev, response]);
      setAssistantToolNameContents(prev => [...prev, toolName]);
      setAssistantToolInputContents(prev => [...prev, toolInput]);
      setAssistantResponse("");
      setAssistantToolName("");
      setAssistantToolInput("");
      console.log("assistant.signature");
    });

    socket.on("assistant.tool.start", (res) => {
      setAssistantToolName(res);
      console.log("assistant.tool.start:", res);
      toolName = res;
      toolInput = "";
    });

    socket.on("assistant.tool", (res) => {
      setAssistantToolInput(res);
      console.log("assistat.tool:", res);
      toolInput = toolInput + res;
    });

    return () => {
      socket.off("user.message", () => console.log("Closing user message event"));
      socket.off("assistant.thinking.start", () => console.log("Closing assistant thinking start event"));
      socket.off("assistant.thinking", () => console.log("Closing assistant thinking event"));
      socket.off("assistant.response.start", () => console.log("Closing assistant response start event"));
      socket.off("assistant.response", () => console.log("Closing assistant response event"));
      socket.off("assistant.signature", () => console.log("Closing assistant signature event"));
      socket.off("assistant.tool.start", () => console.log("Closing assistant tool start event"));
      socket.off("assistant.tool", () => console.log("Closing assistant tool event"));
    };
  }, []);
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
        justifyContent: "flex-end"
      }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            paddingInline: 12,
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 12,
              padding: 12,
              color: "white",
              fontFamily: "Roboto-Mono",
              flex: 1,
            }}
            placeholder="Prompt"
            value={prompt}
            onChangeText={setPrompt}
          />
          {prompt ?
            <Pressable
              style={{
                backgroundColor: PURPLE,
                borderRadius: 100,
                padding: 12,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onPress}
            >
              <Image source={require("../../assets/images/send.png")} />
            </Pressable>
            : null
          }
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

