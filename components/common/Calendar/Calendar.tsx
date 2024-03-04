import React,{ useState } from 'react';
import { View, Button, Text,StyleSheet } from 'react-native';
import DatePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

import { FONTS } from '../../../constants/theme';

const MyCalendar: React.FC = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <View style={styles.container}>
    {/* <DatePicker
      locale='es'
      headerContainerStyle={{backgroundColor: 'white',height:50}}
      headerButtonsPosition='right'
      headerTextStyle={{color: "#414141", fontFamily: FONTS.RubikMedium}}
      mode="range"
      date={date}
      onChange={(params) => setDate(params.date)}
    /> */}
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    marginTop: 50
  }});

export default MyCalendar;