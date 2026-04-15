import { BACKEND_ENDPOINT, BLACK_LIGHT, GRAY } from "@/utils/constants";
import { getItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";

export default function StatusBar() {
  const [backendEndpoint, setBackendEndpoint] = useState<string>("");
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const socket = io(backendEndpoint);
  socket.on("connect", () => {
    console.log("Backend connected");
    setIsBackendConnected(true);
  });
  socket.on("disconnect", () => {
    console.log("Backend disconnected");
    setIsBackendConnected(false);
  });
  socket.on("connect_error", (err) => {
    console.log("Backend connection error:", err);
    setIsBackendConnected(false);
    loadBackendEndpoint();
  });

  async function loadBackendEndpoint() {
    const backendEndpoint = await getItemAsync(BACKEND_ENDPOINT);
    console.log("backendEndpoint:", backendEndpoint);

    if (backendEndpoint) setBackendEndpoint(backendEndpoint);
  }

  useEffect(() => {
    loadBackendEndpoint()
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
      }}
      edges={["top"]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text style={{ color: "white" }}>Backend: </Text>
        <View
          style={{
            backgroundColor: isBackendConnected ? "green" : GRAY,
            width: 12,
            height: 12,
            borderRadius: 100,
          }}
        />
      </View>
    </SafeAreaView>
  );

}

