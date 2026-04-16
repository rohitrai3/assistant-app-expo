import { GRAY_DARK } from "@/utils/constants";
import { state$ } from "@/utils/store";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Notification() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  state$.notification.onChange(({ value }) => {
    setContent(value.content);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, value.duration);
  });


  useEffect(() => {

  }, []);

  if (isVisible) {
    return (
      <View
        style={{
          backgroundColor: GRAY_DARK,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "RobotoMono"
          }}
        >
          {content}
        </Text>
      </View>
    );
  }

}

