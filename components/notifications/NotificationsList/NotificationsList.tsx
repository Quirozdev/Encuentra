import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import styles from "./notificationsList.style";
import { COLORS } from "../../../constants/theme";
import ConfigurationIcon from "../../../assets/images/notifications/configuration.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function NotificationsList() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ paddingLeft: 16 }}>
            <ReturnButton />
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.headerText}>Notificaciones</Text>
          </View>
          <TouchableOpacity
            style={{ paddingRight: 16 }}
            onPress={() => {
              router.push("/notifications/preferences");
            }}
          >
            <ConfigurationIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
