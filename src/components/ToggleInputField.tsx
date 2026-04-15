import { GRAY, PURPLE } from "@/utils/constants";
import { Dispatch, SetStateAction } from "react";
import { Switch } from "react-native";

type ToggleInputFieldProps = {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}

export default function ToggleInputField({ value, setValue }: ToggleInputFieldProps) {

  function onValueChange() {
    setValue(prev => !prev);
  }

  return (
    <Switch
      thumbColor={value ? PURPLE : GRAY}
      value={value}
      onValueChange={onValueChange}
    />
  );

}

