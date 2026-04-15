import { GRAY } from "@/utils/constants";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import AddLlmEndpoint from "./AddLlmEndpoint";

export default function LlmEndpoints() {
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
        LLM Endpoints
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
      <AddLlmEndpoint isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </View>
  );

}

