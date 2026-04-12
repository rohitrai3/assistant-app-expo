import { GRAY, GRAY_DARK } from "@/utils/constants";
import { Text, View } from "react-native";

type AssistantResponseView = {
  content: string;
}

export default function AssistantResponseView({ content }: AssistantResponseView) {

  return (
    <View>
      <Text
        style={{
          color: "white",
          paddingInline: 12,
          paddingBlock: 6,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          maxWidth: "80%",
          backgroundColor: GRAY_DARK,
        }}
      >
        {content}
      </Text>
    </View>
  );
}

