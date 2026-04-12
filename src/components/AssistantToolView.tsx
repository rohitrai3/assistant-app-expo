import { GRAY } from "@/utils/constants";
import { Text, View } from "react-native";

type AssistantToolView = {
  name: string;
  input: string;
}

export default function AssistantToolView({ name, input }: AssistantToolView) {

  return (
    <View>
      <Text
        style={{
          opacity: 1 / 4,
          color: "white",
        }}
      >
        Assistant: Thinking...
      </Text>
      <Text
        style={{
          color: GRAY,
          paddingInline: 12,
          paddingBlock: 6,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          borderWidth: 1,
          borderLeftWidth: 0,
          borderColor: GRAY,
          maxWidth: "80%",
        }}
      >
        Name: {name}, Input: {input}
      </Text>
    </View>
  );
}
