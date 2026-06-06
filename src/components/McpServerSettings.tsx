import { Text, View } from "react-native";
import IconButton from "./IconButton";
import { useState } from "react";
import AddMcpServer from "./AddMcpServer";
import { Server } from "@/utils/types";
import { state$ } from "@/utils/store";

export default function McpServerSettings() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [servers, setServers] = useState<Server[]>(state$.servers.get());
  function onPress() {
    setIsModalVisible(true);
  }

  function onServerAdd(server: Server) {
    setServers(prev => [...prev, server]);
  }

  return (
    <View style={{ paddingInline: 12, gap: 12, paddingBottom: 24 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "white", fontFamily: "RobotoMono", fontSize: 24, paddingBottom: 12 }}>
          MCP Servers
        </Text>
        <IconButton name="add" action={onPress} size="medium" />
        <AddMcpServer
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onServerAdd={onServerAdd}
        />
      </View>
    </View>
  );
}
