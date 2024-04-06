import { ActivityIndicator, Text, View } from "react-native";
import styles from "./fullScreenLoading.style";

interface FullScreenLoadingProps {
  loadingText: string;
}

export default function FullScreenLoading({
  loadingText,
}: FullScreenLoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"small"} />
      <Text style={styles.text}>{loadingText}</Text>
    </View>
  );
}
