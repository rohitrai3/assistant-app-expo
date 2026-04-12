import { PURPLE } from "@/utils/constants";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [prompt, setPrompt] = useState<string>("");

  function onPress() {
    console.log("prompt:", prompt);
  }

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

