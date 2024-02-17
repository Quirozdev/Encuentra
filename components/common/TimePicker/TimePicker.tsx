import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./timePicker.style";
import { COLORS } from "../../../constants/theme";
import React from "react";

type TimePickerProps = Omit<
  React.ComponentProps<typeof DateTimePicker>,
  "value"
> & {
  time: Date;
  label: string;
  onChangeTime: (date: Date) => void;
};

export default function TimePicker({
  time,
  onChangeTime,
  label,
  style,
}: TimePickerProps) {
  const [show, setShow] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={() => setShow(true)}>
        <Text style={[styles.text, showLabel && { color: COLORS.grey }]}>
          {showLabel ? label :  time.toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit', hour12: true })}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          mode="time"
          value={time}
          onChange={(event, selectedDate) => {
            setShow(false);
            onChangeTime(selectedDate);
            setShowLabel(false);
          }}
        />
      )}
    </View>
  );
}
