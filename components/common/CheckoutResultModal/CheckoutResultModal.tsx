import { Text, View, Modal } from 'react-native';

import styles from './CheckoutResultModal.style';
import CancelIcon from '../../../assets/images/cancel_icon.svg';
import SuccessIcon from '../../../assets/images/success_icon.svg';
import { TouchableOpacity } from 'react-native';
import { useRouter, useNavigation} from 'expo-router';

const CheckoutResultModal = ({ isVisible, type }) => {
    const router = useRouter();
    var message = "";
    var buttonMessage = "";
    type === "exito" ? message = "Completado exitosamente" : message = "El proceso fue cancelado"
    type === "exito" ? buttonMessage = "Ver" : buttonMessage = "Inicio"
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalViewUp}>
                    <View style={styles.iconContainer}>
                        {type==="exito" && 
                            <SuccessIcon/>
                        }
                        {type!="exito" &&
                            <CancelIcon/>
                        }
                        
                    </View>
                    <View style={styles.contentContainer}>                          
                        <Text style={styles.modalText}>{message}</Text>
                    </View>
                </View>
                <View style={styles.modalViewDown}>
                    <View style={styles.contentContainer}>
                        <TouchableOpacity
                         style={[styles.confirmButton, type === "exito" ? {} : {backgroundColor:"#D0DEEB"}]}
                         onPress={type==="exito" ? ()=>{router.navigate("/")} : ()=>{router.back()}}> 
                            <Text style={[styles.confirmText, type === "exito" ? {} : {color:"#414141"}]}>{buttonMessage}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default CheckoutResultModal;