import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";
import ItemStatus from "./ItemStatus";
import { state$ } from "@/utils/store";
import Notification from "./Notification";

export default function StatusBar() {
  const [backendEndpoint, setBackendEndpoint] = useState<string>("");
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [isLlmConnected, setIsLlmConnected] = useState<boolean>(false);
  // const socket = io(backendEndpoint);

  // socket.on("connect", () => {
  //   console.log("Backend connected");
  //   setIsBackendConnected(true);
  // });
  // socket.on("disconnect", () => {
  //   console.log("Backend disconnected");
  //   setIsBackendConnected(false);
  // });
  // socket.on("connect_error", (err) => {
  //   console.log("Backend connection error:", err);
  //   setIsBackendConnected(false);
  //   loadBackendEndpoint();
  // });
  // socket.emit("online");

  async function loadBackendEndpoint() {
    const backendEndpoint = state$.backend.get();
    console.log("backendEndpoint:", backendEndpoint);

    if (backendEndpoint) setBackendEndpoint(backendEndpoint);
  }

  useEffect(() => {
    // socket.on("online", () => {
    //   console.log("online");
    //   socket.emit("online");
    // });
    //
    // return () => {
    //   socket.off("online", () => console.log("Closing online event"));
    // };
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
          gap: 8,
        }}
      >
        <ItemStatus name="Backend" status={isBackendConnected} />
        <ItemStatus name="LLM" status={isLlmConnected} />
      </View>
      <Notification />
    </SafeAreaView>
  );

}

