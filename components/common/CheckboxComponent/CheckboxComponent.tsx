import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import styles from "./checkboxComponent.style";

interface CheckBoxProps {
    style?: ViewStyle;
    error?: boolean;
    value: boolean;
    onValueChange: () => void;
  }
const CheckBox = ({ style,error,value, onValueChange }) => {
    return (
      <View style={[styles.checkboxContainer,style]}>
        <TouchableOpacity style={styles.checkboxButton}
          onPress={onValueChange}
        >
        <View style={[
            styles.checkbox,error ? styles.checkboxError : null,
            value ? styles.checkboxChecked : styles.checkboxUnchecked,
          ]}>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default CheckBox;