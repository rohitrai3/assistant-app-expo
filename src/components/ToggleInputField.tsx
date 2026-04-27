import { GRAY, PURPLE } from "@/utils/constants";
import { Switch } from "react-native";

type ToggleInputFieldProps = {
  name: string;
  value: boolean;
  action: (arg: string) => void;
}

export default function ToggleInputField({ name, value, action }: ToggleInputFieldProps) {

  function onValueChange() {
    action(name);
  }

  return (
    <Switch
      thumbColor={value ? PURPLE : GRAY}
      value={value}
      onValueChange={onValueChange}
    />
  );

}

