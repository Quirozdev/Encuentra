import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./guestLoginRequired.style";
import LinkButton from "../LinkButton/linkButton";
import { useRouter } from "expo-router";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function GuestLoginRequired() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Necesitas iniciar sesión para hacer uso de esta funcionalidad
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/users/login");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
