import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import styles from "./createEventForm.style";
import DatePicker from "../../common/DatePicker/DatePicker";
import TimePicker from "../../common/TimePicker/TimePicker";
import { sumDaysToDate } from "../../../src/lib/dates";
import { TouchableOpacity } from "react-native";

export default function CreateEventForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState(sumDaysToDate(new Date(), 1));
  const [hora, setHora] = useState(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Crear evento</Text>
      <BaseTextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder={"Nombre del evento"}
      />
      <BaseTextInput
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder={"Descripción"}
        numberOfLines={3}
        multiline={true}
        style={{ paddingBottom: 24, paddingTop: 6 }}
      />
      <View style={styles.dateInputsContainer}>
        <DatePicker
          date={fecha}
          onChangeDate={setFecha}
          label={"Fecha"}
          minimumDate={sumDaysToDate(new Date(), 1)}
          style={styles.dateInput}
        />
        <TimePicker
          time={hora}
          onChangeTime={setHora}
          label={"Hora"}
          style={styles.dateInput}
        />
      </View>
      <TouchableOpacity style={styles.nextBtn}>
        <Text style={styles.nextBtnText}>Siguiente</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
