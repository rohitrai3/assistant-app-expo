import { useState } from "react";
import { Text, View } from "react-native";

export default function StatusBar() {
  const [username, setUsername] = useState<string>("Enter username");

  return (
    <View style={{ backgroundColor: "#ff0000" }}>
      <Text>{username}</Text>
    </View>
  );
}

