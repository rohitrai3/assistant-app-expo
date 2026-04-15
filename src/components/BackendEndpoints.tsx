import { GRAY } from "@/utils/constants";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import AddBackendEndpoint from "./AddBackendEndpoint";

export default function BackendEndpoints() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function onPress() {
    setIsModalVisible(true);
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingInline: 12,
      }}
    >
      <Text
        style={{
          fontFamily: "RobotoMono",
          color: "white",
          fontSize: 24,
        }}
      >
        Backend Endpoints
      </Text>
      <Pressable
        style={{
          backgroundColor: GRAY,
          padding: 4,
          borderRadius: 100,
        }}
        onPress={onPress}
      >
        <Image source={require("../../assets/images/add.png")} />
      </Pressable>
      <AddBackendEndpoint isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </View>
  );

}

