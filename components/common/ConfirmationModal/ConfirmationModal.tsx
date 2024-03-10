import { Text, View, Modal } from 'react-native';

import styles from './ConfirmationModal.style';
import ExitButton from '../ExitButton/ExitButton';
import ShieldIcon from '../../../assets/images/shieldIcon.svg'
import { TouchableOpacity } from 'react-native';

const ConfirmationModal = ({ isVisible, message, onPress, exitButtonPress }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <View style={styles.contentContainer}>
                        <View style={styles.buttonContainer}>
                            <ExitButton handlePress={exitButtonPress}/>
                        </View>
                        <View style={{marginTop:30}}>
                            <ShieldIcon/>
                        </View>
                        
                        <Text style={styles.modalText}>{message}</Text>
                        <TouchableOpacity style={styles.confirmButton} onPress={onPress}> 
                            <Text style={styles.confirmText}>Confirmar</Text>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={exitButtonPress} style={styles.cancelButton}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                    </View>
                    
 
                </View>
            </View>
        </Modal>
    );
}

export default ConfirmationModal;