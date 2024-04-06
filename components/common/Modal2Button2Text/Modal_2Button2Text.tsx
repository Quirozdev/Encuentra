import { Text, View, Modal } from 'react-native';

import styles from './Modal_2Button2Text.style';
import SolidColorButton from '../SolidColorButton/SolidColorButton';
import ExitButton from '../ExitButton/ExitButton';

const ModalTwoButtonTwoText = ({ isVisible, title, message1, message2, buttonText1, buttonText2, onPress1, onPress2, buttonColor, textColor, exitButtonPress }) => {
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
                        <View>
                            <Text style={styles.modalText}>{message1}</Text>
                            <Text style={styles.modalText2}>{message2}</Text>
                        </View>
                        
                        <View style={styles.buttonsContainer}>
                            <SolidColorButton
                            text={buttonText1}
                            handleNavigate={onPress1}
                            buttonColor={buttonColor}
                            textColor={textColor}
                            height={54}
                            width={130}
                            additionalStyles={{marginRight: 20}}
                            textStyles={{fontSize: 14, margin: 10, textAlign: "center"}}
                            />
                            <SolidColorButton
                                text={buttonText2}
                                handleNavigate={onPress2}
                                buttonColor={buttonColor}
                                textColor={textColor}
                                height={54}
                                width={130}
                                textStyles={{fontSize: 14, margin: 10, textAlign: "center"}}
                            />
                        </View>
                        
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ModalTwoButtonTwoText;