import { useRef, useState } from "react";
import IconButton from "./IconButton";
import { PRIMARY } from "@/utils/constants";

export default function AudioInput() {
  const [recording, setRecording] = useState<boolean>(false);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // async function startRecording() {
  //   streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
  //   const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType: "audio/webm" });
  //   mediaRecorderRef.current = mediaRecorder;
  //
  //   mediaRecorder.addEventListener("dataavailable", async (event) => {
  //     if (event.data.size > 0) {
  //       chunksRef.current.push(event.data);
  //     }
  //
  //     if (mediaRecorder.state === "inactive") {
  //       let blob = new Blob(chunksRef.current, { type: "audio/wav" });
  //
  //       chunksRef.current = [];
  //
  //       // const audioData = await read_audio(URL.createObjectURL(blob), 16000);
  //
  //       // socket.emit("conversation", audioData);
  //
  //       streamRef.current?.getTracks().forEach(track => track.stop());
  //     }
  //   });
  //
  //   mediaRecorder.start();
  //   setRecording(true);
  // }
  //
  // function stopRecording() {
  //   if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
  //     mediaRecorderRef.current.stop();
  //     setRecording(false);
  //   }
  // };


  function onClick() {
    if (recording) {
      setRecording(false);
      // stopRecording();
    } else {
      setRecording(true);
      // startRecording();
    }
  }

  return (
    <IconButton name={recording ? "mic_off" : "mic"} action={onClick} type={recording ? "" : PRIMARY} />
  );
}

