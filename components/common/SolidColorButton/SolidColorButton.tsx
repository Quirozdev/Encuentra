import { TouchableOpacity, Text } from 'react-native';
import  styles from './SolidColorButton.style';

const SolidColorButton = ({ text, handleNavigate, buttonColor, textColor, height, width, additionalStyles, textStyles }) => {
    return (
        <TouchableOpacity onPress={handleNavigate} style={[styles.button, {backgroundColor: buttonColor, height, width}, additionalStyles]}>
            <Text style={[styles.text, {color:textColor}, textStyles]}>{text}</Text>
        </TouchableOpacity>

    )
}

SolidColorButton.defaultProps = {
    height: 60,
    width: 300,
    additionalStyles: {},
    textStyles: {}
}

export default SolidColorButton;