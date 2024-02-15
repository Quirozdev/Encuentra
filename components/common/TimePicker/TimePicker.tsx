import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./timePicker.style";
import { COLORS } from "../../../constants/theme";
import { formatHour } from "../../../src/lib/dates";

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
      <Pressable style={styles.button} onPress={() => setShow(true)}>
        <Text style={[styles.text, showLabel && { color: COLORS.grey }]}>
          {showLabel ? label : `${formatHour(time)}`}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          mode="time"
          value={time ? time : new Date()}
          onChange={(event, selectedDate) => {
            // IMPORTANTE que primero se oculte para que no aparezca 2 veces al confirmar
            setShow(false);
            if (event.type === "set") {
              onChangeTime(selectedDate);
              setShowLabel(false);
            }
          }}
        />
      )}
    </View>
  );
}
