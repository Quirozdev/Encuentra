import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MultiSelect } from 'react-native-element-dropdown';
import DatePicker from '../../common/DatePicker/DatePicker';
import LinkButton from '../../common/LinkButton/linkButton';
import TimePicker from '../../common/TimePicker/TimePicker';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { sumDaysToDate } from '../../../src/lib/dates';
import { getAllCategories } from '../../../src/services/categories';
import SelectMultiple from '../../common/MultiSelect/MultiSelect';
import { EventsContext } from '../../../src/providers/EventsProvider';
import { getAllEventsWithCategories } from '../../../src/services/events';
import { supabase } from '../../../src/supabase';

interface SelectableCategory {
    id: number;
    emoji:string,
    text: string;
    color: string;
    emojiAndText:string;
  }

  interface FilterEventProps {
    // Define prop typses here
    scrollTo: (num:number) => void; // Example of an optional prop
  }
  

const FilterEvent: React.FC<FilterEventProps> = ({scrollTo}) => {

    const [startDate, setStartDate] = useState(sumDaysToDate(new Date(), 1));
  const [startHour, setStartHour] = useState(new Date());
  const [endDate, setEndDate] = useState(sumDaysToDate(new Date(), 1));
  const [endHour, setEndHour] = useState(new Date());
  const [categories, setCategories] = useState<SelectableCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState(['']);
  const {events,setEvents} = useContext(EventsContext);

  async function filterEvents(){
    try {
        
        // Construct the query
        const { data: filteredEvents, error } = await supabase
          .from('eventos')
          .select('*')
          .gte('fecha', startDate.toISOString()) // Filter by start date
          .lte('fecha', endDate.toISOString()) // Filter by end date
          .gte('hora', startHour.toLocaleTimeString('es-MX', { hour12: false })) // Filter by start time
          .lte('hora', endHour.toLocaleTimeString('es-MX', { hour12: false })) // Filter by end time
//          .in('id_categoria', selectedCategories); // Filter by selected category IDs
        console.log(filteredEvents);
        setEvents(filteredEvents);

        scrollTo(0);
        if (error) {
          throw error;
        }
    
        return filteredEvents;
      } catch (error) {
        console.error('Error fetching filtered events:', error.message);
        return null;
      }
  }

  function clearFilter(){
    getAllEventsWithCategories().then(({ orderedData, error }) => {
        setEvents(orderedData);
      });
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
            emojiAndText: `${category.emoji} ${category.nombre}`
          };
        }
      );
      setCategories(selectableCategories);
      
    });
  }, []);
  
  return (
    
    <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTitle}>Filtrar</Text>
        <TouchableOpacity onPress={clearFilter} style={styles.clearBtn}><Text style={{fontSize:12,color:COLORS.grey}}>Borrar filtros</Text></TouchableOpacity>
        </View>
          <Text style={styles.title}>Seleccionar fecha</Text>
          <Text style={styles.subtitle}>Desde</Text>
          <View style={{flexDirection:'row',gap:5}}>
            <TimePicker 
            time={startHour}
            onChangeTime={setStartHour}
            label={"Hora"}
            style={styles.dateInput}></TimePicker>
          <DatePicker date={startDate}
            onChangeDate={setStartDate}
            label={"Fecha"}
            minimumDate={sumDaysToDate(new Date(), 1)}
            style={styles.dateInput}></DatePicker>
          </View>
          
            <Text style={styles.subtitle}>Hasta</Text>
            <View style={{flexDirection:'row',gap:5}}>
            <TimePicker 
            time={endHour}
            onChangeTime={setEndHour}
            label={"Hora"}
            style={styles.dateInput}></TimePicker>
           
            <DatePicker date={endDate}
            onChangeDate={setEndDate}
            label={"Fecha"}
            minimumDate={sumDaysToDate(new Date(), 1)}
            style={styles.dateInput}></DatePicker>
            </View>
             <Text style={styles.title}>Seleccionar categorías</Text>
             <SelectMultiple 
             data={categories}
             value={selectedCategories}
             labelField="emojiAndText"
             valueField="id"
             onChange={(categories) => {
               setSelectedCategories(categories);
             }}
             placeholder="Categorias"
             searchPlaceholder="Buscar categoría"></SelectMultiple>
             <View style={{alignItems:'center',marginTop:15}}>
             <LinkButton text={'Filtrar'} handlePress={filterEvents}></LinkButton>
             </View>
            

          </View>
  );
};

export default FilterEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:10,
    paddingHorizontal:20,
    gap:8
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  clearBtn:{
    borderRadius:20,
    backgroundColor: COLORS.lightGrey,
    paddingVertical:8,
    paddingHorizontal:12

  },
  headerTitle:{
    fontSize: SIZES.large,
    color:COLORS.dark,

    
    fontFamily:FONTS.RubikBold,
  },
  title:{
    fontSize:14,
    color:COLORS.grey,
    fontFamily:FONTS.RubikRegular,
    fontWeight:'400'
  },
  subtitle:{
    fontSize:12,
    color:COLORS.grey,
    fontFamily:FONTS.RubikRegular,
    fontWeight:'400'
  },
  dateInput: {
    flex: 1,
  },
});