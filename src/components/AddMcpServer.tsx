import { MODAL_BACKGROUND, PRIMARY } from "@/utils/constants";
import { KeyValuePair, Server } from "@/utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputField from "./TextInputField";
import IconButton from "./IconButton";
import SelectInputField from "./SelectInputField";
import KeyValueInputField from "./KeyValueInputField";
import { useAudioPlayer } from "expo-audio";

type AddMcpServerProps = {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  onServerAdd: (server: Server) => void;
}

export default function AddMcpServer({ isModalVisible, setIsModalVisible, onServerAdd }: AddMcpServerProps) {
  const [name, setName] = useState<string>("");
  const [selectedCommand, setSelectedCommand] = useState<string>("node");
  const [args, setArgs] = useState<string>("");
  const [envVars, setEnvVars] = useState<KeyValuePair[]>([]);
  const commands = ["node"];
  const audioSource = require("../../assets/sounds/add.mp3");
  const player = useAudioPlayer(audioSource);

  async function save() {
  }

  function close() {
    setIsModalVisible(false);
  }

  function onCommandSelection(command: string) {
    setSelectedCommand(command);
  }

  function addEnvVar() {
    player.seekTo(0);
    player.play();
    setEnvVars(prev => [...prev, { key: "", value: "" }]);
  }

  function onEnvVarChange(envVar: KeyValuePair) {
    setEnvVars(prev => prev.map(item => item.key === envVar.key ? envVar : item));
    console.log("envVars: ", envVars);
  }

  return (
    <Modal transparent={true} visible={isModalVisible}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(0, 0, 0 / 0.5)", paddingBottom: 24 }}>
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
              backgroundColor: MODAL_BACKGROUND,
              padding: 24,
              borderRadius: 24,
              width: "80%",
              gap: 48
            }}
          >
            <View style={{ gap: 12 }}>
              <TextInputField placeholder="Enter name..." value={name} setValue={setName} />
              <SelectInputField
                value={selectedCommand}
                options={commands}
                action={onCommandSelection}
              />
              <TextInputField placeholder="Enter args..." value={args} setValue={setArgs} />
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white", flex: 1 }}>Environment variables:</Text>
                <IconButton name="add" action={addEnvVar} size="small" />
              </View>
              {
                envVars.map((envVar, index) =>
                  <KeyValueInputField key={index} pair={envVar} onChange={onEnvVarChange} />)
              }
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <IconButton name="close" action={close} />
              {name ? <IconButton name="check" action={save} type={PRIMARY} /> : null}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
