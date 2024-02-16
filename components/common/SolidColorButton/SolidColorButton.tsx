import { TouchableOpacity, Text } from 'react-native';
import  styles from './SolidColorButton.style';

const SolidColorButton = ({ text, handleNavigate, buttonColor, textColor, height, width, additionalStyles }) => {
    return (
        <TouchableOpacity onPress={handleNavigate} style={[styles.button, {backgroundColor: buttonColor, height, width}, additionalStyles]}>
            <Text style={[styles.text, {color:textColor}]}>{text}</Text>
        </TouchableOpacity>

    )
}

SolidColorButton.defaultProps = {
    height: 60,
    width: 300,
    additionalStyles: {}
}

export default SolidColorButton;