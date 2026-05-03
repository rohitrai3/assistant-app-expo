import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AddBackendEndpoint from "./AddBackendEndpoint";
import { state$ } from "@/utils/store";
import ToggleInputField from "./ToggleInputField";
import IconButton from "./IconButton";
import { observer } from "@legendapp/state/react";
import { GRAY_DARK } from "@/utils/constants";
import { Endpoint } from "@/utils/types";

const BackendEndpoints = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [endpoints, setEndpoints] = useState<Endpoint[]>(state$.endpoints.get());
  const [isSelectedEndpoint, setIsSelectedEndpoint] = useState<boolean>(false);

  function onPress() {
    setIsModalVisible(true);
  }

  function removeEndpoint(url: string) {
    state$.endpoints.set(prev => prev.filter(endpoint => endpoint.url !== url));
  }

  return (
    <View style={{ paddingInline: 12, gap: 12, paddingBottom: 24 }}>
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
          <IconButton name="close" value={endpoint.url} action={removeEndpoint} size="small" />
          <Text style={{ color: "white", flex: 1 }}>{endpoint.url}</Text>
          <ToggleInputField value={endpoint.isSelected} />
          <View
            style={{
              backgroundColor: endpoint.isSelected ? "green" : GRAY_DARK,
              width: 12,
              height: 12,
              borderRadius: 100,
            }}
          />
        </View>
      )}
    </View>
  );

});

export default BackendEndpoints;

