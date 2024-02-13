import { Text, View, Modal } from 'react-native';

import styles from './Modal_1Button.style';
import SolidColorButton from '../SolidColorButton/SolidColorButton';

const ModalOneButton = ({ isVisible, title, message, buttonText, onPress, buttonColor, textColor }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
               <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{message}</Text>
                        <SolidColorButton
                            text={buttonText}
                            handleNavigate={onPress}
                            buttonColor={buttonColor}
                            textColor={textColor}
                        />
                    </View>
                </View>
        </Modal>
    );
}

export default ModalOneButton;