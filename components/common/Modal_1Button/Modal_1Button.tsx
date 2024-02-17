import { Text, View, Modal } from 'react-native';

import styles from './Modal_1Button.style';
import SolidColorButton from '../SolidColorButton/SolidColorButton';
import ExitButton from '../ExitButton/ExitButton';

const ModalOneButton = ({ isVisible, title, message, buttonText, onPress, buttonColor, textColor, exitButtonPress }) => {
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
                        <Text style={styles.modalText}>{message}</Text>
                        <SolidColorButton
                        text={buttonText}
                        handleNavigate={onPress}
                        buttonColor={buttonColor}
                        textColor={textColor}
                    />
                    </View>
 
                </View>
            </View>
        </Modal>
    );
}

export default ModalOneButton;