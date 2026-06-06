import { useState } from "react";
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
  const [isFinanceConnected, setIsFinanceConnected] = useState<boolean>(false);

  if (state$.selectedEndpointUrl.get()) {
    const socket = SocketSingleton.getInstance();

    socket.on("connect", () => {
      setIsBackendConnected(true);
    });
    socket.on("disconnect", () => {
      setIsBackendConnected(false);
    });
    socket.on("connect_error", (err) => {
      console.log("Backend connection error:", err);
      setIsBackendConnected(false);
    });
    socket.emit("status.llm.check");
    socket.on("status.llm.online", () => {
      setIsLlmConnected(true);
    });
    socket.on("status.llm.offline", () => {
      setIsLlmConnected(false);
    });
    socket.emit("status.finance.check");
    socket.on("status.finance.online", () => {
      setIsFinanceConnected(true);
    });
  }

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
        <ItemStatus name="Finance" status={isFinanceConnected} />
      </View>
      <Notification />
    </SafeAreaView>
  );

});

export default StatusBar;

