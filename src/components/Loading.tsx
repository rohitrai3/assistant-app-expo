import { useEffect } from "react";
import { Animated, Easing, Image } from "react-native";

export default function Loading() {
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [])

  return (
    <Animated.View style={{ transform: [{ rotate: spin }], width: 24, height: 24 }}>
      <Image source={require("../../assets/images/load.png")} />
    </Animated.View>
  );

}

