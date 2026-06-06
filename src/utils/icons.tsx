import Svg, { Path } from "react-native-svg";

type SvgProps = {
  color: string;
}

export function RemoveIcon({ color }: SvgProps) {

  return (
    <Svg height="24px" viewBox="0 -960 960 960" width="24px" fill={color}>
      <Path d="M200-440v-80h560v80H200Z" />
    </Svg>
  );
}

