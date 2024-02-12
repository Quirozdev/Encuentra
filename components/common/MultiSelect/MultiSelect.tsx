import { useState } from "react";
import { View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import styles from "./multiSelect.style";
import { MultiSelectProps } from "react-native-element-dropdown/lib/typescript/components/MultiSelect/model";

export default function SelectMultiple<T>({
  data,
  value,
  labelField,
  valueField,
  onChange,
  placeholder,
  searchPlaceholder,
  ...props
}: MultiSelectProps<T>) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <MultiSelect
        value={value}
        data={data}
        labelField={labelField}
        valueField={valueField}
        onChange={(item) => {
          onChange(item);
          setIsFocus(false);
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={styles.dropdown}
        placeholder={!isFocus ? placeholder : "..."}
        placeholderStyle={styles.placeholderStyle}
        search
        searchPlaceholder={searchPlaceholder}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
}
