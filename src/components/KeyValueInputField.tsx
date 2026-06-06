import { KeyValuePair } from "@/utils/types";
import { useState } from "react";
import { TextInput, View } from "react-native";

type KeyValueInputFieldProps = {
  pair: KeyValuePair;
  onChange: (arg: KeyValuePair) => void;
}

export default function KeyValueInputField({ pair, onChange }: KeyValueInputFieldProps) {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");

  function onKeyChange(text: string) {
    setKey(text);
    pair.key = text;
    onChange(pair);
  }

  function onValueChange(text: string) {
    setValue(text);
    pair.value = text;
    onChange(pair);
  }

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderRightWidth: 0,
          borderColor: "white",
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          padding: 12,
          color: "white",
          fontFamily: "RobotoMono",
        }}
        placeholder="Key..."
        value={key}
        onChangeText={onKeyChange}
      />
      <TextInput
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "white",
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          padding: 12,
          color: "white",
          fontFamily: "RobotoMono",
        }}
        placeholder="Value..."
        value={value}
        onChangeText={onValueChange}
      />
    </View>
  );
}
