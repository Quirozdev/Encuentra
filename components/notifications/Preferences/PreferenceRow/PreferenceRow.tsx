import { ActivityIndicator, Switch, Text, View } from "react-native";
import styles from "./preferenceRow.style";

interface PreferenceRowProps {
  preferenceText: string;
  value: boolean;
  onValueChange: () => void;
  loadingStateChange: boolean;
}

export default function PreferenceRow({
  preferenceText,
  value,
  onValueChange,
  loadingStateChange,
}: PreferenceRowProps) {
  return (
    <View style={styles.preference}>
      <Text style={styles.preferenceText}>{preferenceText}</Text>
      {/* <ActivityIndicator /> */}
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={loadingStateChange}
      />
    </View>
  );
}
