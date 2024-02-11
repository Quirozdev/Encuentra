import { useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./select.style";

interface Data {
  label: string;
  value: string;
}

interface SelectProps extends React.ComponentProps<typeof Dropdown<Data>> {}

export default function Select({
  data,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
}: SelectProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        value={value}
        data={data}
        valueField={"value"}
        labelField={"label"}
        onChange={(item) => {
          onChange(item);
          setIsFocus(false);
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={[styles.dropdown, isFocus && styles.onFocus]}
        placeholder={!isFocus ? placeholder : "..."}
        placeholderStyle={styles.placeholderStyle}
        search
        searchPlaceholder={searchPlaceholder}
      />
    </View>
  );
}
