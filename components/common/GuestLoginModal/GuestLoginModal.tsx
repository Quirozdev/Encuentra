import { useRouter } from "expo-router";
import ModalOneButton from "../Modal_1Button/Modal_1Button";
import { COLORS } from "../../../constants/theme";

export default function GuestLoginModal({ isVisible, setIsVisible }) {
  const router = useRouter();
  return (
    <ModalOneButton
      isVisible={isVisible}
      buttonColor={COLORS.darkOrange}
      buttonText={"Comenzar"}
      exitButtonPress={() => {
        setIsVisible(false);
      }}
      message={
        "Para acceder a las funcionalidades completas de Encuentra sé parte de nuestra comunidad."
      }
      onPress={() => {
        setIsVisible(false);
        router.push("/users/login");
      }}
      textColor={COLORS.white}
      title={""}
    />
  );
}
