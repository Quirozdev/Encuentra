import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import styles from "./createEventForm.style";
import DatePicker from "../../common/DatePicker/DatePicker";
import TimePicker from "../../common/TimePicker/TimePicker";
import { sumDaysToDate } from "../../../src/lib/dates";
import { TouchableOpacity } from "react-native";
import Select from "../../common/Select/Select";
import SelectMultiple from "../../common/MultiSelect/MultiSelect";
import {
  CityBasicInfo,
  StateBasicInfo,
} from "../../../src/types/geography.types";
import {
  getAllStates,
  getCitiesFromState,
} from "../../../src/services/geography";
import { getAllCategories } from "../../../src/services/categories";
import { COLORS } from "../../../constants/theme";

interface SelectableCategory {
  id: number;
  emojiAndText: string;
}

export default function CreateEventForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(sumDaysToDate(new Date(), 1));
  const [hour, setHour] = useState(new Date());
  const [selectedStateId, setSelectedStateId] =
    useState<StateBasicInfo["id"]>(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCityId, setSelectedCityId] =
    useState<CityBasicInfo["id"]>(null);
  const [direction, setDirection] = useState("");

  const [states, setStates] = useState<StateBasicInfo[]>([]);
  const [cities, setCities] = useState<CityBasicInfo[]>([]);
  const [categories, setCategories] = useState<SelectableCategory[]>([]);

  console.log(selectedCategories);

  useEffect(() => {
    getAllCategories().then(({ data, error }) => {
      const selectableCategories: SelectableCategory[] = data.map(
        (category) => {
          return {
            id: category.id,
            emojiAndText: `${category.emoji} ${category.nombre}`,
          };
        }
      );
      setCategories(selectableCategories);
    });

    getAllStates().then(({ data, error }) => {
      setStates(data);
    });
  }, []);

  useEffect(() => {
    if (!selectedStateId) return;
    getCitiesFromState(selectedStateId).then(({ data, error }) => {
      console.log(data);
      setCities(data);
    });
  }, [selectedStateId]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Crear evento</Text>
      <BaseTextInput
        value={name}
        onChangeText={setName}
        placeholder={"Nombre del evento"}
        style={styles.inputText}
        placeholderTextColor={COLORS.grey}
      />
      <BaseTextInput
        value={description}
        onChangeText={setDescription}
        placeholder={"Descripción"}
        numberOfLines={3}
        multiline={true}
        style={[{ paddingBottom: 24, paddingTop: 6 }, styles.inputText]}
        placeholderTextColor={COLORS.grey}
      />
      <View style={styles.dateInputsContainer}>
        <DatePicker
          date={date}
          onChangeDate={setDate}
          label={"Fecha"}
          minimumDate={sumDaysToDate(new Date(), 1)}
          style={styles.dateInput}
        />
        <TimePicker
          time={hour}
          onChangeTime={setHour}
          label={"Hora"}
          style={styles.dateInput}
        />
      </View>
      <SelectMultiple
        data={categories}
        value={selectedCategories}
        labelField="emojiAndText"
        valueField="id"
        onChange={(categories) => {
          setSelectedCategories(categories);
        }}
        placeholder="Categorias"
        searchPlaceholder="Buscar categoría"
        maxSelect={3}
      />
      {states ? (
        <Select
          data={states}
          labelField={"nombre"}
          valueField={"id"}
          onChange={(state) => {
            setSelectedStateId(state.id);
            // en un cambio de estado resetear el select del municipio
            setSelectedCityId(null);
          }}
          placeholder="Estado"
          searchPlaceholder="Buscar estado..."
        />
      ) : (
        <ActivityIndicator />
      )}
      {cities.length > 0 ? (
        <Select
          data={cities}
          labelField={"nombre"}
          valueField={"id"}
          onChange={(city) => {
            setSelectedCityId(city.id);
          }}
          placeholder="Municipio"
          searchPlaceholder="Buscar municipio..."
        />
      ) : null}
      <BaseTextInput
        value={direction}
        onChangeText={setDirection}
        placeholder={"Dirección"}
        style={styles.inputText}
        placeholderTextColor={COLORS.grey}
      />
      <TouchableOpacity style={styles.nextBtn}>
        <Text style={styles.nextBtnText}>Siguiente</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
