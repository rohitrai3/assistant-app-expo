import { GRAY_DARK } from "@/utils/constants";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

type SelectInputFieldProps = {
  options: string[];
}

export default function SelectInputField({ options }: SelectInputFieldProps) {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [value, setValue] = useState<string>("en");

  function expand() {
    setIsExpand(prev => !prev);
  }

  function onSelection(value: string) {
    setValue(value);
    setIsExpand(false);
  }

  return (
    <View>
      <Pressable onPress={expand}>
        <View
          style={{
            flexDirection: "row",
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 8,
            paddingInline: 8,
            paddingBlock: 4,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontFamily: "RobotoMono", }}>
            {value}
          </Text>
          {isExpand ?
            <Image source={require("../../assets/images/arrow_up.png")} /> :
            <Image source={require("../../assets/images/arrow_down.png")} />
          }
        </View>
      </Pressable>
      {
        isExpand ?
          <View
            style={{
              position: "relative",
              backgroundColor: GRAY_DARK,
              zIndex: 1,
              paddingInline: 12,
              borderRadius: 8,
            }}
          >
            {options.map((option, index) =>
              <Pressable key={index} onPress={() => onSelection(option)}>
                <Text style={{ color: "white", fontFamily: "RobotoMono" }}>
                  {option}
                </Text>
              </Pressable>
            )}
          </View> :
          null
      }
    </View>
  );

}

