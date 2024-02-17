import { Text, View, Modal } from 'react-native';

import styles from './Modal_2Button.style';
import SolidColorButton from '../SolidColorButton/SolidColorButton';
import ExitButton from '../ExitButton/ExitButton';

const ModalTwoButton = ({ isVisible, title, message, buttonText1, buttonText2, onPress1, onPress2, buttonColor, textColor, exitButtonPress }) => {
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
                        <View style={styles.buttonsContainer}>
                            <SolidColorButton
                            text={buttonText1}
                            handleNavigate={onPress1}
                            buttonColor={buttonColor}
                            textColor={textColor}
                            height={60}
                            width={150}
                            additionalStyles={{marginRight: 20}}
                            />
                            <SolidColorButton
                                text={buttonText2}
                                handleNavigate={onPress2}
                                buttonColor={buttonColor}
                                textColor={textColor}
                                height={60}
                            width={150}
                            />
                        </View>
                        
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ModalTwoButton;