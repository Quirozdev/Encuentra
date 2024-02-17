import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./datePicker.style";
import { COLORS } from "../../../constants/theme";
import { formatDate } from "../../../src/lib/dates";

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
  maximumDate,
  onChangeDate,
  label,
  style,
  ...props
}: DatePickerProps) {
  const [show, setShow] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.button} onPress={() => setShow(true)}>
        <Text style={[styles.text, showLabel && { color: COLORS.grey }]}>
          {showLabel ? label : `${formatDate(date, "-")}`}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          mode="date"
          value={date ? date : new Date()}
          onChange={(event, selectedDate) => {
            // IMPORTANTE que primero se oculte para que no aparezca 2 veces al confirmar
            setShow(false);
            if (event.type === "set") {
              onChangeDate(selectedDate);
              setShowLabel(false);
            }
          }}
          onTouchCancel={() => {}}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
}
