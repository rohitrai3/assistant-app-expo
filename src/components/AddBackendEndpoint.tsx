import { GRAY_DARK, PRIMARY } from "@/utils/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, View } from "react-native";
import TextInputField from "./TextInputField";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "./IconButton";
import { state$ } from "@/utils/store";
import { Endpoint } from "@/utils/types";

type AddBackendEndpointProps = {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  onEndpointAdd: (endpoint: Endpoint) => void;
}

export default function AddBackendEndpoint({
  isModalVisible, setIsModalVisible, onEndpointAdd }: AddBackendEndpointProps) {
  const [endpointUrl, setEndpointUrl] = useState<string>("");

  async function save() {
    state$.endpoints.set(prev => [...prev, { url: endpointUrl, isSelected: false, isOnline: null }]);

    state$.notification.set({
      content: `Added backend endpoint: ${endpointUrl}`,
      duration: 3000
    });

    onEndpointAdd({
      url: endpointUrl,
      isSelected: false,
      isOnline: null,
    });

    setEndpointUrl("");
    setIsModalVisible(false);
  }

  function close() {
    setIsModalVisible(false);
  }

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "rgb(0, 0, 0 / 0.5)",
          paddingBottom: 24,
        }}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              backgroundColor: GRAY_DARK,
              padding: 24,
              borderRadius: 24,
              width: "80%",
              gap: 48,
            }}
          >
            <TextInputField
              placeholder={"Enter endpoint..."}
              value={endpointUrl}
              setValue={setEndpointUrl}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <IconButton name="close" action={close} />
              {endpointUrl ? <IconButton name="check" action={save} type={PRIMARY} /> : null}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );

}

