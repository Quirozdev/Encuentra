import React, { useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./select.style";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export default function Select<T>({
  data,
  value,
  onChange,
  labelField,
  valueField,
  placeholder,
  searchPlaceholder,
  ...props
}: DropdownProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        value={selectedValue}
        data={data}
        labelField={labelField}
        valueField={valueField}
        onChange={(item) => {
          // setSelectedValue(item);
          setIsFocus(false);
          onChange(item);
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={[styles.dropdown, isFocus && styles.onFocus]}
        placeholder={!isFocus ? placeholder : "..."}
        placeholderStyle={styles.placeholderStyle}
        search
        searchPlaceholder={searchPlaceholder}
        itemTextStyle={styles.itemStyleTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        {...props}
      />
    </View>
  );
}
