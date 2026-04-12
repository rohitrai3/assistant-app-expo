import { useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [prompt, setPrompt] = useState<string>("");

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
        <TextInput
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 12,
            padding: 10,
            color: "white",
            fontFamily: "Roboto-Mono",
          }}
          placeholder="Prompt"
          value={prompt}
          onChangeText={setPrompt}
        />
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

