import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { speak } from "expo-speech";
import UserMessageView from "./UserMessageView";
import AssistantThinkingView from "./AssistantThinkingView";
import AssistantResponseView from "./AssistantResponseView";
import AssistantToolView from "./AssistantToolView";
import SocketSingleton from "@/utils/socket";

export default function ConversationView() {
  const [userContents, setUserContents] = useState<string[]>([]);
  const [assistantThinkingContents, setAssistantThinkingContents] = useState<string[]>([]);
  const [assistantResponseContents, setAssistantResponseContents] = useState<string[]>([]);
  const [assistantToolNameContents, setAssistantToolNameContents] = useState<string[]>([]);
  const [assistantToolInputContents, setAssistantToolInputContents] = useState<string[]>([]);
  const [assistantThinking, setAssistantThinking] = useState<string>("");
  const [assistantResponse, setAssistantResponse] = useState<string>("");
  const [assistantToolName, setAssistantToolName] = useState<string>("");
  const [assistantToolInput, setAssistantToolInput] = useState<string>("");

  useEffect(() => {
    const socket = SocketSingleton.getInstance();
    let thinking = "";
    let response = "";
    let toolName = "";
    let toolInput = "";

    socket.on("user.message", res => {
      console.log("user.message:", res);
      setUserContents(prev => [...prev, res]);
    });

    socket.on("assistant.thinking.start", () => {
      console.log("assistnat.thinking.start");
      thinking = "";
    });

    socket.on("assistant.thinking", res => {
      thinking = thinking + res;
      setAssistantThinking(prev => prev + res);
    });

    socket.on("assistant.response.start", () => {
      console.log("assistant.response.start");
      setAssistantThinkingContents(prev => [...prev, thinking]);
      setAssistantThinking("");
      response = "";
    });

    socket.on("assistant.response", (res) => {
      response = response + res;
      setAssistantResponse(prev => prev + res);
    });

    socket.on("assistant.tool.start", (res) => {
      console.log("assistant.tool.start:", res);
      setAssistantToolName(res);
      toolName = res;
      toolInput = "";
    });

    socket.on("assistant.tool", (res) => {
      setAssistantToolInput(res);
      toolInput = toolInput + res;
    });

    socket.on("assistant.message.stop", () => {
      console.log("assistant.message.stop");
      setAssistantResponseContents(prev => [...prev, response]);
      setAssistantToolNameContents(prev => [...prev, toolName]);
      setAssistantToolInputContents(prev => [...prev, toolInput]);
      setAssistantResponse("");
      setAssistantToolName("");
      setAssistantToolInput("");
      speak(response);
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
      socket.off("assistant.message.stop", () => console.log("Closing assistant message stop event"));
    };
  }, []);

  return (
    <ScrollView
      style={{
        display: "flex",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-end",
        gap: 12,
      }}
    >
      {userContents.map((content, index) =>
        <View key={index} style={{ display: "flex", gap: 12 }}>
          <UserMessageView content={content} />
          {assistantThinkingContents[index] &&
            <AssistantThinkingView content={assistantThinkingContents[index]} />}
          {assistantToolNameContents[index] &&
            <AssistantToolView
              name={assistantToolNameContents[index]}
              input={assistantToolInputContents[index]} />}
          {assistantResponseContents[index] &&
            <AssistantResponseView content={assistantResponseContents[index]} />}
        </View>)}
      {assistantThinking && <AssistantThinkingView content={assistantThinking} />}
      {assistantToolName && <AssistantToolView name={assistantToolName} input={assistantToolInput} />}
      {assistantResponse && <AssistantResponseView content={assistantResponse} />}
    </ScrollView>
  );

}

