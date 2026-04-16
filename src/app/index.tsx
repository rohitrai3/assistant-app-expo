import { PURPLE, USERNAME } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, TextInput } from "react-native";
import { io } from "socket.io-client";
import { useRouter } from "expo-router";
import { setItem } from "@/utils/dataStore";
import { state$ } from "@/utils/store";

export default function Index() {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  console.log("home:username:", state$.username.get());
  if (state$.username.get()) router.navigate("/conversation");

  // let socket = io(process.env.EXPO_PUBLIC_BACKEND_URL_1);
  // socket.on("connect_error", (err) => {
  //   console.log("Socket error, fallback:", err);
  //   socket = io(process.env.EXPO_PUBLIC_BACKEND_URL_2);
  // });
  // socket.on("connect", () => console.log("Socket connected"));
  // socket.on("disconnect", (res) => console.log("Socket disconnected:", res));

  async function onPress() {
    state$.username.set(username);
    router.navigate("/conversation");
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
      backgroundColor: "black",
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
    }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 12,
          padding: 12,
          color: "white",
          fontFamily: "RobotoMono",
          height: 48,
          flex: 1,
        }}
        placeholder="What should I call you?"
        value={username}
        onChangeText={setUsername}
      />
      {username ?
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
    </KeyboardAvoidingView>
  );

}

