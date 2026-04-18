import { PRIMARY } from "@/utils/constants";
import SocketSingleton from "@/utils/socket";
import { useState } from "react";
import { View } from "react-native";
import TextInputField from "./TextInputField";
import IconButton from "./IconButton";
import AudioInput from "./AudioInput";

export default function PromptInput() {
  const [prompt, setPrompt] = useState<string>("");

  function sendPrompt() {
    const socket = SocketSingleton.getInstance();
    socket.emit("conversation.text", prompt);
    setPrompt("");
  }

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        paddingInline: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        <TextInputField placeholder="Prompt..." value={prompt} setValue={setPrompt} />
      </View>
      {prompt ?
        <IconButton name="send" action={sendPrompt} type={PRIMARY} />
        : null
      }
      <AudioInput />
    </View>
  );
}
