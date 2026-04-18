import { PRIMARY } from "@/utils/constants";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useRouter } from "expo-router";
import { state$ } from "@/utils/store";
import TextInputField from "@/components/TextInputField";
import IconButton from "@/components/IconButton";
import { login, ping } from "@/utils/backend";

export default function Index() {
  const [username, setUsername] = useState<string>("");
  const [endpoint, setEndpoint] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (state$.username.get()) router.navigate("/conversation");
  });

  async function submit() {
    const isReachable = await ping(endpoint);

    if (isReachable) {
      const loginResponse = await login({
        username: username,
        endpoint: endpoint
      });

      if (loginResponse) {
        state$.username.set(loginResponse.username);
        state$.activeEndpoint.set(loginResponse.activeEndpoint);
        state$.endpoints.set(loginResponse.endpoints);
        router.navigate("/conversation");
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
      backgroundColor: "black",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 48,
      padding: 12,
    }}>
      <View
        style={{
          width: "100%",
          gap: 12,
        }}
      >
        <TextInputField placeholder="Username" value={username} setValue={setUsername} />
        <TextInputField placeholder="Endpoint" value={endpoint} setValue={setEndpoint} />
      </View>
      {(username && endpoint) ?
        <IconButton name="next" action={submit} type={PRIMARY} />
        : null
      }
    </KeyboardAvoidingView>
  );

}

