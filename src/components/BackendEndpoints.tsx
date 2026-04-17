import { GRAY } from "@/utils/constants";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import AddBackendEndpoint from "./AddBackendEndpoint";
import { state$ } from "@/utils/store";
import ToggleInputField from "./ToggleInputField";
import IconButton from "./IconButton";

export default function BackendEndpoints() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isActiveEndpoint, setIsActiveEndpoint] = useState<boolean>(false);
  const endpoints = state$.backendEndpoints.get();

  function onPress() {
    setIsModalVisible(true);
  }

  return (
    <View style={{ paddingInline: 12, gap: 12 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "RobotoMono",
            color: "white",
            fontSize: 24,
            paddingBottom: 12,
          }}
        >
          Backend Endpoints
        </Text>
        <IconButton name="add" action={onPress} isPrimary={false} size="small" />
        <AddBackendEndpoint isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </View>
      {endpoints.map(endpoint =>
        <View
          style={{ flexDirection: "row" }}>
          <Text style={{ color: "white", flex: 1 }}>{endpoint}</Text>
          <ToggleInputField value={isActiveEndpoint} setValue={setIsActiveEndpoint} />
        </View>
      )}
    </View>
  );

}

