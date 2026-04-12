import { PURPLE_DARK } from "@/utils/constants";
import { Text, View } from "react-native";

export type UserMessageViewProps = {
  content: string;
}

export default function UserMessageView({ content }: UserMessageViewProps) {

  return (
    <View
      style={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <Text
        style={{
          opacity: 1 / 4,
          color: "white",
        }}
      >
        User
      </Text>
      <Text
        style={{
          color: "white",
          backgroundColor: PURPLE_DARK,
          paddingInline: 12,
          paddingBlock: 6,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          maxWidth: "80%",
        }}
      >
        {content}
      </Text>
    </View>
  );
}
