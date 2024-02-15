import { TouchableOpacity, Text } from 'react-native';
import  styles from './SolidColorButton.style';
import React from 'react';

const SolidColorButton = ({ text, handleNavigate, buttonColor, textColor }) => {
    return (
        <TouchableOpacity onPress={handleNavigate} style={[styles.button, {backgroundColor: buttonColor}]}>
            <Text style={[styles.text, {color:textColor}]}>{text}</Text>
        </TouchableOpacity>

    )
}

export default SolidColorButton;