import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import styles from "./createEventForm.style";
import DatePicker from "../../common/DatePicker/DatePicker";
import TimePicker from "../../common/TimePicker/TimePicker";
import { sumDaysToDate } from "../../../src/lib/dates";
import { TouchableOpacity } from "react-native";
import Select from "../../common/Select/Select";
import SelectMultiple from "../../common/MultiSelect/MultiSelect";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export default function CreateEventForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState(sumDaysToDate(new Date(), 1));
  const [hora, setHora] = useState(new Date());
  const [estado, setEstado] = useState(null);
  const [categorias, setCategorias] = useState([]);

  console.log(estado);
  console.log(categorias);

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
      <Select
        data={data}
        labelField="label"
        valueField="value"
        onChange={setEstado}
        placeholder="Estado"
        searchPlaceholder="Buscar estado..."
        value={estado}
      />
      <SelectMultiple
        data={data}
        labelField="label"
        valueField="value"
        onChange={setCategorias}
        placeholder="Categorias"
        searchPlaceholder="Buscar categoría"
        value={categorias}
      />
      <TouchableOpacity style={styles.nextBtn}>
        <Text style={styles.nextBtnText}>Siguiente</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
