import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import { CategoriesContext } from "../../../src/providers/CategoryProvider";
import { FilterContext } from "../../../src/providers/FilterProvider";

interface SelectableCategory {
  id: number;
  emoji: string;
  text: string;
  color: string;
  emojiAndText: string;
}

interface FilterEventProps {
  // Define prop typses here
  scrollTo: (num:number) => void; 
  events: any[];
}

const FilterMyEvent: React.FC<FilterEventProps> = ({ scrollTo, events }) => {
  const [formkey, setFormKey] = useState(new Date().toISOString());
  const [categories, setCategories] = useState<SelectableCategory[]>([]);
  const {selectedCategories, setSelectedCategories} = useContext(CategoriesContext);
  const { setEvents, unfilteredEvents } = useContext(EventsContext);
  const { startDate, setStartHour,startHour, setStartDate,endDate, setEndDate, endHour, setEndHour,filterEvents} = useContext(FilterContext);

  function filter() {
    filterEvents(selectedCategories);
    scrollTo(500);
  }

  function clearFilter() {
    setStartDate(null);
    setStartHour(null);
    setEndDate(null);
    setEndHour(null);

    setSelectedCategories([]);
    setFormKey(new Date().toISOString());
    setEvents(unfilteredEvents);
    scrollTo(500);
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
        <LinkButton text={"Filtrar"} handleNavigate={filter}></LinkButton>
      </View>
    </View>
  );
};

export default FilterMyEvent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom:60,

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
