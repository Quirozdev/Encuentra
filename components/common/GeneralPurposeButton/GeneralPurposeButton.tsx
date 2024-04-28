import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import styles from './generalPurposeButton.style';

interface ButtonProps {
    onPress: () => void;
    title: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
  }

  const GeneralPurposeButton = ({
    onPress,
    title,
    buttonStyle = {},
    textStyle = {},
  }: ButtonProps) => {
    return (
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  };


export default GeneralPurposeButton;