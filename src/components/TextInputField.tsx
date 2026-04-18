import { Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";

type TextInputFieldProps = {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function TextInputField({ placeholder, value, setValue }: TextInputFieldProps) {

  return (
    <View style={{ width: "100%" }}>
      <TextInput
        style={{
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
    </View>
  );

}

