import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState, Key } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MultiSelect } from "react-native-element-dropdown";
import DatePicker from "../../common/DatePicker/DatePicker";
import LinkButton from "../../common/LinkButton/linkButton";
import TimePicker from "../../common/TimePicker/TimePicker";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import {
  dateToString,
  sumDaysToDate,
  timeToString,
} from "../../../src/lib/dates";
import { getAllCategories } from "../../../src/services/categories";
import SelectMultiple from "../../common/MultiSelect/MultiSelect";
import { EventsContext } from "../../../src/providers/EventsProvider";
import {
  getAllEventsWithCategories,
  getFilteredEventsWithCategories,
} from "../../../src/services/events";
import { supabase } from "../../../src/supabase";
import { LocationContext } from "../../../src/providers/LocationProvider";

interface SelectableCategory {
  id: number;
  emoji: string;
  text: string;
  color: string;
  emojiAndText: string;
}

interface FilterEventProps {
  // Define prop typses here
  scrollTo: (num: number) => void; // Example of an optional prop
}

const FilterEvent: React.FC<FilterEventProps> = ({ scrollTo }) => {
  const [formkey, setFormKey] = useState(new Date().toISOString());
  const [startDate, setStartDate] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const [categories, setCategories] = useState<SelectableCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { events, setEvents, unfilteredEvents } = useContext(EventsContext);
  const { location } = useContext(LocationContext);

  function filterEvents() {
    const start = startDate !== null ? dateToString(startDate) : null;
    const end = endDate !== null ? dateToString(endDate) : null;
    const startTime = startHour !== null ? timeToString(startHour) : null;
    const endTime = endHour !== null ? timeToString(endHour) : null;
    const cat = selectedCategories.length == 0 ? null : selectedCategories;

    console.log(start, end, startTime, endTime, cat);
    getFilteredEventsWithCategories(
      location,
      start,
      startTime,
      end,
      endTime,
      cat
    ).then(({ data, error }) => setEvents(data));

    scrollTo(0);
  }

  function clearFilter() {
    setStartDate(null);
    setStartHour(null);
    setEndDate(null);
    setEndHour(null);

    setSelectedCategories([]);
    setFormKey(new Date().toISOString());
    setEvents(unfilteredEvents);
    scrollTo(0);
  }

  useEffect(() => {
    getAllCategories().then(({ data, error }) => {
      const selectableCategories: SelectableCategory[] = data.map(
        (category) => {
          return {
            id: category.id,
            emoji: category.emoji,
            text: category.nombre,
            color: category.color,
            emojiAndText: `${category.emoji} ${category.nombre}`,
          };
        }
      );
      setCategories(selectableCategories);
    });
  }, []);

  return (
    <View key={formkey} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filtrar</Text>
        <TouchableOpacity onPress={clearFilter} style={styles.clearBtn}>
          <Text style={{ fontSize: 12, color: COLORS.grey }}>
            Borrar filtros
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Seleccionar fecha</Text>
      <Text style={styles.subtitle}>Desde</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <TimePicker
          time={startHour == null ? new Date() : startHour}
          onChangeTime={setStartHour}
          label={"Hora"}
          style={styles.dateInput}
        ></TimePicker>
        <DatePicker
          date={startDate == null ? new Date() : startDate}
          onChangeDate={setStartDate}
          label={"Fecha"}
          minimumDate={new Date()}
          style={styles.dateInput}
        ></DatePicker>
      </View>

      <Text style={styles.subtitle}>Hasta</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <TimePicker
          time={endHour == null ? new Date() : endHour}
          onChangeTime={setEndHour}
          label={"Hora"}
          style={styles.dateInput}
        ></TimePicker>

        <DatePicker
          date={endDate == null ? new Date() : endDate}
          onChangeDate={setEndDate}
          label={"Fecha"}
          minimumDate={new Date()}
          style={styles.dateInput}
        ></DatePicker>
      </View>
      <Text style={styles.title}>Seleccionar categorías</Text>
      <SelectMultiple
        data={categories}
        value={selectedCategories}
        labelField="emojiAndText"
        valueField="id"
        onChange={(categories) => {
          console.log(categories);
          setSelectedCategories(categories);
        }}
        placeholder="Categorias"
        searchPlaceholder="Buscar categoría"
      ></SelectMultiple>
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <LinkButton text={"Filtrar"} handleNavigate={filterEvents}></LinkButton>
      </View>
    </View>
  );
};

export default FilterEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearBtn: {
    borderRadius: 20,
    backgroundColor: COLORS.lightGrey,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: SIZES.large,
    color: COLORS.dark,

    fontFamily: FONTS.RubikBold,
  },
  title: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: FONTS.RubikRegular,
    fontWeight: "400",
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: FONTS.RubikRegular,
    fontWeight: "400",
  },
  dateInput: {
    flex: 1,
  },
});