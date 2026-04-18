import { Dispatch, SetStateAction } from "react";
import { TextInput } from "react-native";

type TextInputFieldProps = {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function TextInputField({ placeholder, value, setValue }: TextInputFieldProps) {

  return (
    <TextInput
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 12,
        padding: 12,
        color: "white",
        fontFamily: "RobotoMono",
      }}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
    />
  );

}

