import { StyleSheetProperties, View, ViewProps } from "react-native";

interface SeparatorProps extends ViewProps {
  height: number;
  color: string;
}

export default function Separator({
  height,
  color,
  style,
  ...props
}: SeparatorProps) {
  return (
    <View
      style={[{ height: height, backgroundColor: color }, style]}
      {...props}
    ></View>
  );
}
