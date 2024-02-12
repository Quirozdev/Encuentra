import { TextInput, TextInputProps } from "react-native";
import styles from "./baseTextInput.style";

interface BaseTextInputProps extends TextInputProps {}

export default function BaseTextInput({
  placeholder,
  value,
  onChangeText,
  inputMode = "text",
  numberOfLines = 1,
  multiline = false,
  style,
  keyboardType,
  ...props
}: BaseTextInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      inputMode={inputMode}
      numberOfLines={numberOfLines}
      multiline={multiline}
      style={[styles.input, style]}
      keyboardType={keyboardType}
      {...props}
    />
  );
}
