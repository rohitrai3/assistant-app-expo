import { GRAY_DARK } from "@/utils/constants";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

type SelectInputFieldProps = {
  value: string;
  options: string[];
  action: (arg: string) => void;
}

export default function SelectInputField({ value, options, action }: SelectInputFieldProps) {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  function expand() {
    setIsExpand(prev => !prev);
  }

  function onSelection(value: string) {
    setIsExpand(false);
    action(value);
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
            paddingLeft: 8,
            paddingBlock: 4,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontFamily: "RobotoMono", fontSize: 16, }}>
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
          <ScrollView
            style={{
              position: "absolute",
              backgroundColor: GRAY_DARK,
              zIndex: 1,
              paddingInline: 12,
              borderRadius: 8,
              top: 32,
              maxHeight: 100,
            }}
            contentContainerStyle={{
              paddingBlock: 4,
            }}
            nestedScrollEnabled
          >
            {
              options.map((option, index) =>
                <Pressable key={index} onPress={() => onSelection(option)}>
                  <Text style={{ color: "white", fontFamily: "RobotoMono", fontSize: 16, }}>
                    {option}
                  </Text>
                </Pressable>
              )
            }
          </ScrollView> :
          null
      }
    </View >
  );

}

