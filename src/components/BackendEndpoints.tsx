import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import AddBackendEndpoint from "./AddBackendEndpoint";
import { state$ } from "@/utils/store";
import ToggleInputField from "./ToggleInputField";
import IconButton from "./IconButton";
import { observer } from "@legendapp/state/react";
import { Endpoint } from "@/utils/types";
import { ping } from "@/utils/backend";

const BackendEndpoints = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [endpoints, setEndpoints] = useState<Endpoint[]>(state$.endpoints.get());

  function onPress() {
    setIsModalVisible(true);
  }

  function removeEndpoint(url: string) {
    setEndpoints(prev => prev.filter(endpoint => endpoint.url !== url));
    state$.endpoints.set(prev => prev.filter(endpoint => endpoint.url !== url));
  }

  function onEndpointSelection(url: string) {
    setEndpoints(prev => prev.map(endpoint => {
      if (endpoint.url === url) endpoint.isSelected = true;
      else endpoint.isSelected = false;
      return endpoint;
    }));
    state$.selectedEndpointUrl.set(url);
  }

  function onEndpointAdd(endpoint: Endpoint) {
    setEndpoints(prev => [...prev, endpoint]);
  }

  async function pingEndpoint(url: string) {
    const isOnline = await ping(url);
    console.log("isOnline:", isOnline);
    setEndpoints(prev => prev.map(item => {
      if (item.url === url) item.isOnline = isOnline;
      return item;
    }));
  }

  function getPingStyle(isOnline: null | boolean) {
    if (isOnline !== null) {
      if (isOnline) {
        return { borderRadius: 100, backgroundColor: "green" };
      } else {
        return { borderRadius: 100, backgroundColor: "red" };
      }
    }

    return { borderRadius: 100 };
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
        <AddBackendEndpoint
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onEndpointAdd={onEndpointAdd}
        />
      </View>
      {endpoints.map((endpoint, index) =>
        <View key={index} style={{ flexDirection: "row", gap: 12 }}>
          <IconButton name="close" value={endpoint.url} action={removeEndpoint} size="small" />
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Text style={{ color: "white", paddingRight: 8, fontFamily: "RobotoMono", fontSize: 16 }}>
              {endpoint.url}
            </Text>
            <Pressable
              style={getPingStyle(endpoint.isOnline)}
              onPress={() => pingEndpoint(endpoint.url)}
            >
              <Image source={require("../../assets/images/ping.png")} />
            </Pressable>
          </View>
          <ToggleInputField name={endpoint.url} value={endpoint.isSelected} action={onEndpointSelection} />
        </View>
      )}
    </View>
  );

});

export default BackendEndpoints;

