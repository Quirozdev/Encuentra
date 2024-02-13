import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import styles from "./createEventForm.style";
import DatePicker from "../../common/DatePicker/DatePicker";
import TimePicker from "../../common/TimePicker/TimePicker";
import { sumDaysToDate } from "../../../src/lib/dates";
import { TouchableOpacity } from "react-native";
import SelectMultiple from "../../common/MultiSelect/MultiSelect";
import { getGeographicInformationFromLatLong } from "../../../src/services/geography";
import { getAllCategories } from "../../../src/services/categories";
import { COLORS } from "../../../constants/theme";
import Map from "../../common/Map/Map";
import ImageSelector from "../../common/ImageSelector/ImageSelector";

interface SelectableCategory {
  id: number;
  emojiAndText: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function CreateEventForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(sumDaysToDate(new Date(), 1));
  const [hour, setHour] = useState(new Date());
  const [categories, setCategories] = useState<SelectableCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [markerCoordinates, setMarkerCoordinates] = useState<Coordinates>({
    latitude: 29.059304,
    longitude: -110.949333,
  });
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [direction, setDirection] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);

  console.log(markerCoordinates);

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
  }, []);

  useEffect(() => {
    if (!markerCoordinates) return;
    getGeographicInformationFromLatLong(
      markerCoordinates.latitude,
      markerCoordinates.longitude
    ).then((data) => {
      const geographicInfo = data.results[0];
      console.log(geographicInfo);
      const city = geographicInfo.county;
      const state = geographicInfo.state;
      const direction = geographicInfo.address_line1;
      setCity(city);
      setState(state);
      setDirection(direction);
    });
  }, [markerCoordinates]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
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
        <Map
          markerCoordinates={markerCoordinates}
          onDragEnd={setMarkerCoordinates}
        />
        <BaseTextInput
          value={state}
          onChangeText={setState}
          placeholder={"Estado"}
          editable={false}
          style={styles.inputText}
          placeholderTextColor={COLORS.grey}
        />
        <BaseTextInput
          value={city}
          onChangeText={setCity}
          placeholder={"Municipio"}
          editable={false}
          style={styles.inputText}
          placeholderTextColor={COLORS.grey}
        />
        <BaseTextInput
          value={direction}
          onChangeText={setDirection}
          placeholder={"Dirección"}
          editable={false}
          style={styles.inputText}
          placeholderTextColor={COLORS.grey}
        />
        <View style={styles.durationAndFileContainer}>
          <BaseTextInput
            value={duration}
            onChangeText={setDuration}
            placeholder={"Duración"}
            style={[styles.inputText, styles.durationInput]}
            placeholderTextColor={COLORS.grey}
            keyboardType="numeric"
            inputMode="numeric"
          />
          <ImageSelector image={image} onImageChange={setImage} />
        </View>
        <TouchableOpacity style={styles.nextBtn}>
          <Text style={styles.nextBtnText}>Siguiente</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
