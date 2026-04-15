import { PURPLE } from "@/utils/constants";
import { useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";
import { Socket } from "socket.io-client";

type PromptInput = {
  socket: Socket;
}

export default function PromptInput({ socket }: PromptInput) {
  const [prompt, setPrompt] = useState<string>("");

  function onPress() {
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
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 12,
          padding: 12,
          color: "white",
          fontFamily: "RobotoMono",
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
  );
}
