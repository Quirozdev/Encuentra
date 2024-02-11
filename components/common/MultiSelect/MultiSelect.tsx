import { useState } from "react";
import { View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import styles from "./multiSelect.style";

interface Data {
  label: string;
  value: string;
}

interface SelectMultipleProps
  extends React.ComponentProps<typeof MultiSelect<Data>> {}

export default function SelectMultiple({
  data,
  onChange,
  placeholder,
  searchPlaceholder,
  value,
}: SelectMultipleProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <MultiSelect
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
