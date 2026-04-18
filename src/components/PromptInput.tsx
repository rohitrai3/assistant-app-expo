import { PURPLE } from "@/utils/constants";
import SocketSingleton from "@/utils/socket";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import TextInputField from "./TextInputField";

export default function PromptInput() {
  const [prompt, setPrompt] = useState<string>("");

  function onPress() {
    const socket = SocketSingleton.getInstance();
    socket.emit("conversation.text", prompt);
    setPrompt("");
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 12,
        paddingInline: 12,
      }}
    >
      <TextInputField placeholder="Prompt..." value={prompt} setValue={setPrompt} />
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
  );
}
