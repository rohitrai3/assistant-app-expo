import { GRAY, GRAY_DARK } from "@/utils/constants";
import { Text, View } from "react-native";

type ItemStatusProps = {
  name: string;
  status: boolean;
}

export default function ItemStatus({ name, status }: ItemStatusProps) {

  return (
    <View style={{ flexDirection: "row", alignItems: "center", }}>
      <Text style={{ color: GRAY }}>{name}: </Text>
      <View
        style={{
          backgroundColor: status ? "green" : GRAY_DARK,
          width: 12,
          height: 12,
          borderRadius: 100,
        }}
      />
    </View>
  );

}

