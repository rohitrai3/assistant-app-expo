import { ConversationContent } from "@/utils/types";
import { View } from "react-native";
import UserMessageView from "./UserMessageView";
import AssistantThinkingView from "./AssistantThinkingView";
import AssistantToolView from "./AssistantToolView";
import AssistantMessageView from "./AssistantMessageView";

type ConversationBlockProps = {
  conversation: ConversationContent;
}

export default function ConversationBlock({ conversation }: ConversationBlockProps) {

  return (
    <View style={{ gap: 12 }}>
      <UserMessageView content={conversation.user} />
      {conversation.thinking ? <AssistantThinkingView content={conversation.thinking} /> : null}
      {conversation.tool ? <AssistantToolView content={conversation.tool} /> : null}
      {conversation.assistant ? <AssistantMessageView content={conversation.assistant} /> : null}
    </View>
  );

}

