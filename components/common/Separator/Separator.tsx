import { StyleSheetProperties, View } from "react-native";

interface SeparatorProps {
  height: number;
  color: string;
}

export default function Separator({ height, color }: SeparatorProps) {
  return <View style={{ height: height, backgroundColor: color }}></View>;
}
