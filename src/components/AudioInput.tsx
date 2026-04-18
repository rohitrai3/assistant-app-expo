import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import { PRIMARY } from "@/utils/constants";
import { Alert } from "react-native";
import SocketSingleton from "@/utils/socket";
import { AudioModule } from "expo-audio";
import { AudioRecorder } from "react-native-audio-api";

export default function AudioInput() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder] = useState(() => new AudioRecorder());
  const socket = SocketSingleton.getInstance();


  async function startRecording() {
    console.log("Start recording");
    const sampleRate = 16000;
    setIsRecording(true);

    recorder.onAudioReady({
      sampleRate,
      bufferLength: 0.1 * sampleRate,
      channelCount: 1,
    },
      ({ buffer }) => {
        socket.emit("conversation.audio.chunk", buffer.getChannelData(0));
      });

    recorder.start();
  }

  async function stopRecording() {
    console.log("Stop recording");
    setIsRecording(false);
    recorder.stop();
    socket.emit("conversation.audio.chunk.stop");
  };

  function record() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permission to access microphone was denied');
      }
    })();
  }, []);

  return (
    <IconButton
      name={isRecording ? "mic_off" : "mic"}
      action={record}
      type={isRecording ? "" : PRIMARY}
    />
  );
}

