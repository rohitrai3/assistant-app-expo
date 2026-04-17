import { GRAY, PURPLE } from "@/utils/constants";
import { Image, Pressable } from "react-native";

type IconButtonProps = {
  name: string;
  value?: string;
  action: (...args: string[]) => void;
  isPrimary: boolean;
  size?: string;
}

export default function IconButton({ name, value, action, isPrimary, size }: IconButtonProps) {

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
        return 96;
    }
  }

  function getIconSize() {
    switch (size) {
      case "small":
        return 12;
      case "medium":
        return 20;
      default:
        return 48;
    }
  }

  return (
    <Pressable
      style={{
        backgroundColor: isPrimary ? PURPLE : GRAY,
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

