import React,{ useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Modal } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { FONTS } from '../../../constants/theme';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Do.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy'
};

LocaleConfig.defaultLocale = 'es';
dayjs.locale('es');

interface Props {
  fecha_inicio: String,
  onFirstDaySelect: (day:string) => void,
  onLastDaySelect: (day:string) => void
}

const MyCalendar: React.FC<Props> = ({fecha_inicio, onFirstDaySelect, onLastDaySelect}) => {
  const [currentMonth, setCurrentMonth] = useState('');
  const [selectedDates, setSelectedDates] = useState({});
  const [initialDates, setInitialDates] = useState([]);
  const fecha_inicio_format = dayjs(fecha_inicio).format('YYYY-MM-DD')
  const fecha_inicio_config = {"color":"#06BB8E", startingDay:true, endingDay:true, "textColor":'white'}

  useEffect(()=>{
    setSelectedDates({[fecha_inicio_format]: fecha_inicio_config})
    console.log(selectedDates)
  },[])

  const nextMonth = () => {
    const nextMonth = dayjs(currentMonth).add(1, 'month').format('YYYY-MM-DD');
    setCurrentMonth(nextMonth);
  };

  const prevMonth = () => {
    const prevMonth = dayjs(currentMonth).subtract(1, 'month').format('YYYY-MM-DD');
    setCurrentMonth(prevMonth);
  };

  const renderHeader = (date) => {
    const formatted_date = dayjs(date).format('MMMM YYYY')
    const capitalized_date = formatted_date.charAt(0).toUpperCase() + formatted_date.slice(1)
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Prev" onPress={prevMonth} />
        <Text>{ capitalized_date }</Text>
        <Button title="Next" onPress={nextMonth} />
      </View>
    );
  };


  function getDatesBetween(startDate, endDate) {
    const dates = {};
    dates[fecha_inicio_format] = fecha_inicio_config
    var currentDate = dayjs(startDate)
    const startingDayFormat = {"color":"#775EFF", startingDay:true, "textColor":'white'}
    const betweenDayFormat = {"color":"#775EFF", "textColor":'white'}
    const endingDayFormat = {"color":"#775EFF", endingDay:true, "textColor":'white'}
    const sameDayStartEnd = {"color":"#775EFF",startingDay:true, endingDay:true, "textColor":'white'}
  
    while (currentDate <= dayjs(endDate)) {
      var currentDateFormat = currentDate.format('YYYY-MM-DD')
      if (currentDate.isSame(dayjs(startDate))) {
         dates[currentDateFormat] = startingDayFormat
       }
      if (currentDate.isAfter(dayjs(startDate)) && currentDate.isBefore(dayjs(endDate))) {
         dates[currentDateFormat] = betweenDayFormat
      } 
      if (currentDate.isSame(dayjs(endDate))) {
        dates[currentDateFormat] = endingDayFormat
      } 
      if (startDate === endDate) {
        dates[currentDateFormat] = sameDayStartEnd
      }

      currentDate = currentDate.add(1, 'day');
    }
  
    return dates;
  }

  const onDayPress = (day) => {
    var initialDatesCopy = [...initialDates]
    var selectedDatesCopy = {...selectedDates}
    switch (initialDatesCopy.length) {
      case 0:
        initialDatesCopy[initialDatesCopy.length] = day.dateString
        selectedDatesCopy[day.dateString]={"color":"#775EFF", startingDay:true, endingDay:true, "textColor":'white'}
        selectedDatesCopy[fecha_inicio_format] = fecha_inicio_config
        onFirstDaySelect(dayjs(day.dateString).format("YYYY-MM-DD"))
        break;
      case 1:
        initialDatesCopy[initialDatesCopy.length] = day.dateString
        if (dayjs(initialDatesCopy[0]) > dayjs(initialDatesCopy[1])) {
          initialDatesCopy.reverse()
          onFirstDaySelect(initialDatesCopy[0])
          onLastDaySelect(initialDatesCopy[1])
        } else {
          onLastDaySelect(dayjs(day.dateString).format("YYYY-MM-DD"))
        }
        selectedDatesCopy = getDatesBetween(initialDatesCopy[0],initialDatesCopy[1])
        
        break;        
      default:
        initialDatesCopy = []
        selectedDatesCopy = {[fecha_inicio_format]: fecha_inicio_config}
        initialDatesCopy[initialDatesCopy.length] = day.dateString
        selectedDatesCopy[day.dateString]={"color":"#775EFF", startingDay:true, endingDay:true, "textColor":'white'}
        onFirstDaySelect(dayjs(day.dateString).format("YYYY-MM-DD"))
        onLastDaySelect("YYYY-MM-DD")
        break;
    }
    setInitialDates(initialDatesCopy)
    setSelectedDates(selectedDatesCopy)
  }

  return (
    <View>
      <Calendar
      markingType='period'
      markedDates={selectedDates}
      onDayPress={onDayPress}
      current={dayjs().format('YYYY-MM-DD')}
      // renderHeader={renderHeader}
      minDate={dayjs().format('YYYY-MM-DD')}
      maxDate={fecha_inicio_format}
      />
    </View>
  );
};


export default MyCalendar;