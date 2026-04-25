import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { speak } from "expo-speech";
import AssistantThinkingView from "./AssistantThinkingView";
import AssistantMessageView from "./AssistantMessageView";
import AssistantToolView from "./AssistantToolView";
import SocketSingleton from "@/utils/socket";
import ConversationBlock from "./ConversationBlock";
import { ConversationContent } from "@/utils/types";

export default function ConversationView() {
  const [conversations, setConversations] = useState<ConversationContent[]>([]);
  const [thinking, setThinking] = useState<string>("");
  const [tool, setTool] = useState<string>("");
  const [assistant, setAssistant] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const socket = SocketSingleton.getInstance();

    socket.on("conversation.start", () => {
      console.log("conversation.start");
      setConversations(prev => [...prev, { user: "", thinking: "", tool: "", assistant: "" }]);
    });

    socket.on("conversation.user.message", res => {
      console.log("conversation.user.message");
      setConversations(prev => [...prev, { user: res, thinking: "", tool: "", assistant: "" }]);
    });

    socket.on("assistant.thinking.start", () => {
      console.log("assistant.thinking.start");
      setThinking("");
    });

    socket.on("assistant.thinking.chunk", res => {
      console.log("assistant.thinking.chunk");
      setThinking(prev => prev + res);
    });

    socket.on("assistant.thinking.stop", () => {
      console.log("assistant.thinking.stop");
      setThinking(thinking => {
        setConversations(conversations =>
          conversations.map((conversation, index) =>
            index === conversations.length - 1 ? { ...conversation, thinking: thinking } : conversation
          ));

        return "";
      });
    });

    socket.on("assistant.tool.name", res => {
      console.log("assistant.tool.name");
      setTool(`Name: ${res}, Input: `);
    });

    socket.on("assistant.tool.input.chunk", res => {
      console.log("assistant.tool.input.chunk");
      setTool(prev => prev + res);
    });

    socket.on("assistant.tool.message", res => {
      console.log("assistant.tool.message");
      setAssistant(() => {
        setConversations(conversations =>
          conversations.map((conversation, index) =>
            index === conversations.length - 1 ? { ...conversation, assistant: res } : conversation
          ));
        speak(res);

        return "";
      });
    });

    socket.on("assistant.tool.stop", () => {
      console.log("assistant.tool.stop");
      setTool(tool => {
        setConversations(conversations =>
          conversations.map((conversation, index) =>
            index === conversations.length - 1 ? { ...conversation, tool: tool } : conversation
          ));

        return "";
      });
    });

    socket.on("assistant.message.start", () => {
      console.log("assistant.message.start");
      setAssistant("");
    });

    socket.on("assistant.message.chunk", res => {
      console.log("assistant.message.chunk");
      setAssistant(prev => prev + res);
    });

    socket.on("assistant.message.stop", () => {
      console.log("assistant.message.stop");
      setAssistant(assistant => {
        setConversations(conversations =>
          conversations.map((conversation, index) =>
            index === conversations.length - 1 ? { ...conversation, assistant: assistant } : conversation
          ));
        speak(assistant);

        return "";
      });
    });

    return () => {
      socket.off("conversation.start", () =>
        console.log("Closing conversation start event"));
      socket.off("conversation.user.message", () =>
        console.log("Closing user message event"));
      socket.off("assistant.thinking.start", () =>
        console.log("Closing assistant thinking start event"));
      socket.off("assistant.thinking.chunk", () =>
        console.log("Closing assistant thinking chunk event"));
      socket.off("assistant.thinking.stop", () =>
        console.log("Closing assistant thinking stop event"));
      socket.off("assistant.tool.name", () =>
        console.log("Closing assistant tool name event"));
      socket.off("assistant.tool.input.chunk", () =>
        console.log("Closing assistant tool input chunk event"));
      socket.off("assistant.tool.message", () =>
        console.log("Closing assistant tool message event"));
      socket.off("assistant.tool.stop", () =>
        console.log("Closing assistant tool stop event"));
      socket.off("assistant.message.start", () =>
        console.log("Closing assistant message start event"));
      socket.off("assistant.message.chunk", () =>
        console.log("Closing assistant message chunk event"));
      socket.off("assistant.message.stop", () =>
        console.log("Closing assistant message stop event"));
    };
  }, []);

  function scrollToBottom() {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }

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
      ref={scrollViewRef}
      onContentSizeChange={scrollToBottom}
    >
      {conversations.map((conversation, index) =>
        <ConversationBlock key={index} conversation={conversation} />
      )}
      {thinking ? <AssistantThinkingView content={thinking} /> : null}
      {tool ? <AssistantToolView content={tool} /> : null}
      {assistant ? <AssistantMessageView content={assistant} /> : null}
    </ScrollView>
  );

};

