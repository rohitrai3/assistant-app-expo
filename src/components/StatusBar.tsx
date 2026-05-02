import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemStatus from "./ItemStatus";
import { state$ } from "@/utils/store";
import Notification from "./Notification";
import { observer } from "@legendapp/state/react";
import SocketSingleton from "@/utils/socket";

const StatusBar = observer(() => {
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [isLlmConnected, setIsLlmConnected] = useState<boolean>(false);

  useEffect(() => {
    if (state$.activeEndpoint.get()) {
      const socket = SocketSingleton.getInstance();

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
      });
      socket.emit("status.llm.check");
      socket.on("status.llm.online", () => {
        console.log("LLM connected");
        setIsLlmConnected(true);
      });
    }
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

});

export default StatusBar;

