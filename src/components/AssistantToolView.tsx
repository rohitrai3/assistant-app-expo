import { GRAY } from "@/utils/constants";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type AssistantToolView = {
  content: string;
}

export default function AssistantToolView({ content }: AssistantToolView) {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  function onPress() {
    setIsExpand(prev => !prev);
  }

  return (
    <View>
      <Pressable onPress={onPress}>
        <Text
          style={{
            opacity: 1 / 4,
            color: "white",
          }}
        >
          Tool...
        </Text>
        {isExpand ?
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
            Name: {content}
          </Text>
          : null
        }
      </Pressable>
    </View>
  );
}
