import { BACKEND_ENDPOINT, GRAY_DARK } from "@/utils/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, ToastAndroid, View } from "react-native";
import TextInputField from "./TextInputField";
import ToggleInputField from "./ToggleInputField";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "./IconButton";
import { setItemAsync } from "expo-secure-store";

type AddBackendEndpointProps = {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AddBackendEndpoint({ isModalVisible, setIsModalVisible }: AddBackendEndpointProps) {
  const [endpoint, setEndpoint] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  async function save() {
    await setItemAsync(BACKEND_ENDPOINT, endpoint);
    ToastAndroid.show(
      `Added backend endpoint: ${endpoint} and active status: ${isActive}`,
      ToastAndroid.LONG
    );
    setEndpoint("");
    setIsActive(false);
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
            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              <TextInputField placeholder={"Enter endpoint..."} value={endpoint} setValue={setEndpoint} />
              <ToggleInputField value={isActive} setValue={setIsActive} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <IconButton name="close" action={close} isPrimary={false} />
              <IconButton name="check" action={save} isPrimary={true} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );

}

