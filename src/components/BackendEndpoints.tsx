import { useState } from "react";
import { Text, View } from "react-native";
import AddBackendEndpoint from "./AddBackendEndpoint";
import { state$ } from "@/utils/store";
import ToggleInputField from "./ToggleInputField";
import IconButton from "./IconButton";
import { observer } from "@legendapp/state/react";

const BackendEndpoints = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isActiveEndpoint, setIsActiveEndpoint] = useState<boolean>(false);
  const endpoints = state$.backendEndpoints.get();

  function onPress() {
    setIsModalVisible(true);
  }

  function removeEndpoint(endpoint: string) {
    state$.backendEndpoints.set(prev => prev.filter(item => item !== endpoint));
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
        <IconButton name="add" action={onPress} size="medium" />
        <AddBackendEndpoint isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </View>
      {endpoints.map((endpoint, index) =>
        <View key={index} style={{ flexDirection: "row", gap: 12 }}>
          <IconButton name="close" value={endpoint} action={removeEndpoint} size="small" />
          <Text style={{ color: "white", flex: 1 }}>{endpoint}</Text>
          <ToggleInputField value={isActiveEndpoint} setValue={setIsActiveEndpoint} />
        </View>
      )}
    </View>
  );

});

export default BackendEndpoints;

