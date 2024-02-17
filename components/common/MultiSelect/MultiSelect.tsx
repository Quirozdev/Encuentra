import { useState } from "react";
import { View,ViewStyle,Text } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import styles from "./multiSelect.style";
import { MultiSelectProps } from "react-native-element-dropdown/lib/typescript/components/MultiSelect/model";
import React from "react";
import { Category } from "../../../src/types/categories.types";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import { Feather, Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";

export default function SelectMultiple<T>({
  data,
  value,
  labelField,
  valueField,
  onChange,
  placeholder,
  searchPlaceholder,
  style,
  backgroundColor,
  ...props
}: MultiSelectProps<T>) {
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = item => {
    return (
      <View style={[styles.selectedStyle,{backgroundColor:item.color}]}>
        <View style={{flexDirection:'row',alignItems:'center',gap:2}}>
        <Text style={{fontSize:20}}>{item.emoji}</Text>
        <Text style={styles.selectedTextStyle}>{item.text}</Text>
        </View>
        
        <Feather name="x" size={12} color={COLORS.dark}/>
      </View>
    );
  };

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
        style={[styles.dropdown, style]}
        placeholder={!isFocus ? placeholder : "..."}
        placeholderStyle={styles.placeholderStyle}
        search
        renderSelectedItem={renderItem}
        searchPlaceholder={searchPlaceholder}
        selectedStyle={styles.selectedStyle}
        {...props}
      />
    </View>
  );
}
