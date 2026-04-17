import { GRAY, PURPLE } from "@/utils/constants";
import { Image, Pressable } from "react-native";

type IconButtonProps = {
  name: string;
  action: () => void;
  isPrimary: boolean;
  size?: string;
}

export default function IconButton({ name, action, isPrimary, size }: IconButtonProps) {

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

  return (
    <Pressable
      style={{
        backgroundColor: isPrimary ? PURPLE : GRAY,
        padding: 12,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        width: size === "small" ? 32 : "auto",
        height: size === "small" ? 32 : "auto",
      }}
      onPress={action}
    >
      {<Image source={getPath()} />}
    </Pressable>
  );

}

