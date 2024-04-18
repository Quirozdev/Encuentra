import { Text, View, Modal } from "react-native";

import styles from "./ConfirmationModal.style";
import ExitButton from "../ExitButton/ExitButton";
import ShieldIcon from "../../../assets/images/shieldIcon.svg";
import { TouchableOpacity } from "react-native";
import CheckoutButton from "../../payments/CheckoutButton";
import { Payment, createPayment } from "../../../src/services/payments";

interface ConfirmationModalProps {
  isVisible: boolean;
  message: string;
  onPress: () => void;
  exitButtonPress: () => void;
  paymentDetails: Payment;
}

const ConfirmationModal = ({
  isVisible,
  message,
  onPress,
  exitButtonPress,
  paymentDetails,
}: ConfirmationModalProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <View style={styles.contentContainer}>
            <View style={styles.buttonContainer}>
              <ExitButton handlePress={exitButtonPress} />
            </View>
            <View style={{ marginTop: 30 }}>
              <ShieldIcon />
            </View>

            <Text style={styles.modalText}>{message}</Text>
            <CheckoutButton
              payDetails={{ amount: paymentDetails.total }}
              onSuccess={async () => {
                onPress();

                await createPayment({
                  id_usuario: paymentDetails.id_usuario,
                  tipo_pago: "destacar_evento",
                  desglose_costos: paymentDetails.desglose_costos,
                  total: paymentDetails.total,
                  id_evento: Number(paymentDetails.id_evento),
                });
              }}
              text="Confirmar"
              textStyle={styles.confirmText}
              buttonStyle={styles.confirmButton}
            />
            {/* <TouchableOpacity style={styles.confirmButton} onPress={onPress}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={exitButtonPress}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
