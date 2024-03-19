import { Text, View, TouchableOpacity } from "react-native";
import FeatureEventIcon from "../../../assets/images/FeatureEventIcon.svg";
import styles from "./featureEventButton.style";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../../src/providers/AuthProvider";
import GuestLoginModal from "../GuestLoginModal/GuestLoginModal";

const FeatureEventButton = ({}) => {
  const router = useRouter();
  const { session } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          if (!session) {
            setIsModalVisible(true);
            return;
          }
          router.push("/events/featureEvent");
        }}
      >
        <FeatureEventIcon />
        <Text style={styles.text}>Destacar evento</Text>
      </TouchableOpacity>
      <GuestLoginModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
    </View>
  );
};

export default FeatureEventButton;
