import { useEffect } from "react";
import IconButton from "./IconButton";
import { PRIMARY } from "@/utils/constants";
import { useAudioRecorder, RecordingPresets, useAudioRecorderState, AudioModule, setAudioModeAsync } from "expo-audio";
import { Alert } from "react-native";

export default function AudioInput() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  async function startRecording() {
    console.log("startRecording");
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  }

  async function stopRecording() {
    console.log("stopRecording");
    await audioRecorder.stop();
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();

      if (!status.granted) Alert.alert("Permission to access microphone was denied");

      setAudioModeAsync(({
        playsInSilentMode: true,
        allowsRecording: true,
      }));
    })();
  }, []);

  function record() {
    if (recorderState.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  return (
    <IconButton
      name={recorderState.isRecording ? "mic_off" : "mic"}
      action={record}
      type={recorderState.isRecording ? "" : PRIMARY}
    />
  );
}

