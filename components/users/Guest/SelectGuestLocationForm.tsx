import { useRouter } from "expo-router";
import ChangeLocationForm from "../../events/ChangeLocationForm/ChangeLocationForm";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./selectGuestLocationForm.style";

export default function SelectGuestLocationForm() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.formContainer}>
      <ChangeLocationForm
        titleText="Seleccionar ubicación"
        btnText="Seleccionar"
        additionalOnPressAction={() => {
          router.replace("/events/");
        }}
      />
    </SafeAreaView>
  );
}
