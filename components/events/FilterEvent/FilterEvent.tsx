import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MultiSelect } from 'react-native-element-dropdown';
import DatePicker from '../../common/DatePicker/DatePicker';
import LinkButton from '../../common/LinkButton/linkButton';
import TimePicker from '../../common/TimePicker/TimePicker';
import { COLORS, FONTS } from '../../../constants/theme';
import { sumDaysToDate } from '../../../src/lib/dates';
import { getAllCategories } from '../../../src/services/categories';
import SelectMultiple from '../../common/MultiSelect/MultiSelect';

interface SelectableCategory {
    id: number;
    emoji:string,
    text: string;
    color: string;
    emojiAndText:string;
  }

const FilterEvent = () => {
    const [date, setDate] = useState(sumDaysToDate(new Date(), 1));
  const [hour, setHour] = useState(new Date());
  const [categories, setCategories] = useState<SelectableCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState(['']);

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
          <Text style={styles.title}>Seleccionar fecha</Text>
          <Text style={styles.subtitle}>Desde</Text>
          <View style={{flexDirection:'row',gap:5}}>
            <TimePicker 
            time={hour}
            onChangeTime={setHour}
            label={"Hora"}
            style={styles.dateInput}></TimePicker>
          <DatePicker date={date}
            onChangeDate={setDate}
            label={"Fecha"}
            minimumDate={sumDaysToDate(new Date(), 1)}
            style={styles.dateInput}></DatePicker>
          </View>
          
            <Text style={styles.subtitle}>Hasta</Text>
            <View style={{flexDirection:'row',gap:5}}>
            <TimePicker 
            time={hour}
            onChangeTime={setHour}
            label={"Hora"}
            style={styles.dateInput}></TimePicker>
           
            <DatePicker date={date}
            onChangeDate={setDate}
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
             <LinkButton text={'Filtrar'} handleNavigate={undefined}></LinkButton>
             </View>
            

          </View>
  );
};

export default FilterEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:10,
    paddingHorizontal:15,
    gap:8
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