import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./datePicker.style";
import { COLORS } from "../../../constants/theme";

type DatePickerProps = Omit<
  React.ComponentProps<typeof DateTimePicker>,
  "value"
> & {
  date: Date;
  label: string;
  onChangeDate: (date: Date) => void;
};

export default function DatePicker({
  date,
  minimumDate,
  onChangeDate,
  label,
  style,
}: DatePickerProps) {
  const [show, setShow] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={() => setShow(true)}>
        <Text style={[styles.text, showLabel && { color: COLORS.grey }]}>
          {showLabel
            ? label
            : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={(event, selectedDate) => {
            setShow(false);
            onChangeDate(selectedDate);
            setShowLabel(false);
          }}
          onTouchCancel={() => {}}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
}
