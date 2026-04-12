import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <Text style={{ fontFamily: "Roboto-Mono", color: "white" }}>Hello World!</Text>
    </SafeAreaView>
  );
}

