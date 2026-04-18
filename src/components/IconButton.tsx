import { GRAY, PRIMARY, PURPLE, RED, TERTIARY } from "@/utils/constants";
import { Image, Pressable } from "react-native";

type IconButtonProps = {
  name: string;
  value?: string;
  action: (...args: string[]) => void;
  type?: string;
  size?: string;
}

export default function IconButton({ name, value, action, type, size }: IconButtonProps) {

  function onPress() {
    if (value) {
      action(value);
    } else {
      action();
    }
  }

  function getPath() {
    switch (name) {
      case "check":
        return require("../../assets/images/check.png");
      case "close":
        return require("../../assets/images/close.png");
      case "logout":
        return require("../../assets/images/logout.png");
      case "next":
        return require("../../assets/images/next.png");
      case "send":
        return require("../../assets/images/send.png");
      case "settings":
        return require("../../assets/images/settings.png");
      case "mic":
        return require("../../assets/images/mic.png");
      case "mic_off":
        return require("../../assets/images/mic_off.png");
      default:
        return require("../../assets/images/add.png");
    }
  }

  function getBackgroundSize() {
    switch (size) {
      case "small":
        return 24;
      case "medium":
        return 32;
      default:
        return 46;
    }
  }

  function getIconSize() {
    switch (size) {
      case "small":
        return 12;
      case "medium":
        return 18;
      default:
        return 24;
    }
  }

  function getColor() {
    switch (type) {
      case PRIMARY:
        return PURPLE;
      case TERTIARY:
        return RED;
      default:
        return GRAY;
    }
  }

  return (
    <Pressable
      style={{
        backgroundColor: getColor(),
        padding: 0,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        width: getBackgroundSize(),
        height: getBackgroundSize(),
      }}
      onPress={onPress}
    >
      {<Image style={{ width: getIconSize(), height: getIconSize() }} source={getPath()} />}
    </Pressable>
  );

}

