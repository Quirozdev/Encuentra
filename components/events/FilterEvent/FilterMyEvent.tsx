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
import { LocationContext, LocationContext2 } from "../../../src/providers/LocationProvider";
import { CategoriesContext } from "../../../src/providers/CategoryProvider";
import { MyFilterContext } from "../../../src/providers/MyFilterProvider";
import Select from "../../common/Select/Select";
import { getAllStates, getCitiesFromState, getGeographicInformationFromLatLong } from "../../../src/services/geography";
import * as Location from "expo-location";

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
}

const FilterMyEvent: React.FC<FilterEventProps> = ({ scrollTo }) => {
  const [formkey, setFormKey] = useState(new Date().toISOString());
  const [categories, setCategories] = useState<SelectableCategory[]>([]);
  const {selectedCategories, setSelectedCategories} = useContext(CategoriesContext);
  const { setEvents, unfilteredEvents } = useContext(EventsContext);
  const { location} = useContext(LocationContext);
  const { setLocation} = useContext(LocationContext2);
  const [estado, setEstado] = useState(null);
  const [municipio, setMunicipio] = useState(null);
  const [listaEstados, setListaEstados] = useState([]);
  const [listaCiudades, setListaCiudades] = useState([]);
  const [selectedEstatus, setSelectedEstatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { startDate, setStartHour,startHour, setStartDate, estatus, setEstatus, filterEvents} = useContext(MyFilterContext);
  const baseEventsAlready = false;

  function filter() {
    setEstatus(selectedEstatus);
    setLocation({estado:estado,municipio:municipio});
    filterEvents(selectedCategories);
    scrollTo(500);
  }

  function clearFilter() {
    setStartDate(null);
    setStartHour(null);
    setEstado(location.estado);
    setMunicipio(location.municipio);
    setLocation({estado:location.estado,municipio:location.municipio});
    console.log(location);

    setSelectedCategories([]);
    setEstatus(null);
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

  useEffect(() => {
    getAllStates().then((res) => {
      setListaEstados(res.data);
      let state = res.data.find((dict) => dict.nombre === location.estado);
      getCiudades(state, location.municipio);
    });
    setEstado(location.estado);
    setMunicipio(location.municipio);
  }, [location])

  async function handleLocationClick() {
    setLoading(true);
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    });
    getGeographicInformationFromLatLong(
      location.coords.latitude,
      location.coords.longitude
    ).then((data) => {
      let state = listaEstados.find(
        (dict) => dict.nombre === data.results[0].state
      );
      getCiudades(state, data.results[0].county);
    });
  }

  function getCiudades(selectedEstado, ciudad = "") {
    if (selectedEstado != undefined) {
      getCitiesFromState(selectedEstado.id).then((res) => {
        setListaCiudades(res.data);
        const ciudadSeleccionada = res.data.find((cd) => cd.nombre === ciudad);

        if (ciudadSeleccionada != undefined) {
          setMunicipio({
            id: ciudadSeleccionada.id,
            nombre: ciudadSeleccionada.nombre,
          });
        } else {
          // Se selecciona la primera ciudad de la lista
          setMunicipio(res.data[0]);
        }
      });

      setEstado(selectedEstado);
      setLocation({estado:selectedEstado,municipio:municipio});
      setLoading(false);
    }
  }

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
      <Text style={styles.subtitle}></Text>
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

      <Text style={styles.subtitle}>--------------------Ubicación--------------------</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <View style={{flex:1}}>
          <Select
            placeholder="Estado"
            data={listaEstados}
            labelField="nombre"
            valueField="id"
            onChange={getCiudades}
            value={null}
          />
        </View>
        <View style={{flex:1}}>
          <Select
            placeholder="Municipio"
            data={listaCiudades}
            labelField="nombre"
            valueField="id"
            onChange={setMunicipio}
            value={null}
          />
        </View>
      </View>
      <Text style={styles.subtitle}>-------------------------------------------------</Text>
      <View style={{flexDirection:"row",gap:5}}>
        <View style={{flex:1}}>
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
            style={styles.categoryContainer}
          ></SelectMultiple>
        </View>
        <View style={{flex:1}}>
          <Select
            data={[
              { label: "Todos los eventos", value: "" },
              { label: "Eventos próximos", value: "disponible" },
              { label: "Eventos concluidos", value: "vencido" }
            ]}
            value={null}
            labelField="label"
            valueField="value"
            onChange={({label,value}) => {
              value = value == "" ? null : value;
              setSelectedEstatus(value);
            }}
            placeholder="Ver eventos"
            selectedTextStyle={styles.estatusText}
            style={styles.estatusContainer}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <LinkButton text={"Guardar"} handleNavigate={filter}></LinkButton>
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
  categoryContainer: {
    width: "100%",
  },
  estatusContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: COLORS.lightGrey,
    backgroundColor:COLORS.darkWhite,
    padding: SIZES.xLarge,
    paddingLeft: SIZES.medium,
    color:COLORS.dark,
    width: "100%"
  },
  estatusText: {
    fontSize: 16,
    color: COLORS.grey,
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
    alignSelf: "center",
  },
  dateInput: {
    flex: 1,
  },
});
