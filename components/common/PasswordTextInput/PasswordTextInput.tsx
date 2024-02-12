import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, StyleProp, TextStyle } from 'react-native';
import styles from './PasswordTextInput.style';
import Fluent_eye_icon from '../../../assets/images/fluent_eye_filled.svg';
import Fluent_eye_icon_hidden from '../../../assets/images/fluent_eye_hide_filled.svg';

interface PasswordInputProps {
  placeholder: string,
  style: StyleProp<TextStyle>,
  handleTextChange: React.Dispatch<React.SetStateAction<string>>
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, style, handleTextChange }) => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={!showPassword}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        style={[styles.input, style]}
      />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                  {showPassword ? <Fluent_eye_icon /> : <Fluent_eye_icon_hidden />}
            </TouchableOpacity>
    </View>
  );
};


export default PasswordInput;
