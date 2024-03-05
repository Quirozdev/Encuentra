import React, { useState } from "react";
import {Text, View,SafeAreaView} from "react-native";
import MyCalendar from "../../common/Calendar/Calendar";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { Stack, useLocalSearchParams } from "expo-router";
import styles from './FeatureEventTimeDate.style';
import TimePicker from "../../common/TimePicker/TimePicker";
import dayjs from 'dayjs';


const FeatureEventTimeDate :React.FC = () => {
    const [firstDay, setFirstDay] = useState("YYYY-MM-DD");
    const [lastDay, setLastDay] = useState("YYYY-MM-DD");

    const handleFirstDaySelect = (day) => {

    }

    const handleLastDaySelect = (day) => {

    }

    const handleTimeChange = (time) => {
            console.log(time);
        }

    let numeroDias = 0;
    const event_date = String(useLocalSearchParams().fecha_inicio);
    return (
        <SafeAreaView style={styles.parentContainer}>
            <Stack.Screen
                options={{
                headerShown: true,
                headerStyle: {backgroundColor: "#FFFFFF"},
                headerShadowVisible: false,
                headerLeft: () => <ReturnButton />,
                headerTitle: "Elige un rango de fecha"
                }}
            />
                <View style={styles.calendarContainer}>
                    <MyCalendar fecha_inicio={event_date} onFirstDaySelect={setFirstDay} onLastDaySelect={setLastDay}/>
                </View>   
                <View style={styles.separator}/>
                <View>
                    <View style={styles.rangoFechaContainer}>
                        <View>
                            <Text style={styles.dateTimeButtonsLabel}>Desde</Text>
                            <Text style={styles.dateButton}>{firstDay === "YYYY-MM-DD" ? "DD/MM/YYYY" : dayjs(firstDay).format("DD/MM/YYYY")}</Text>
                        </View>
                        <View>
                            <Text style={styles.dateTimeButtonsLabel}>Hasta</Text>
                            <Text style={styles.dateButton}>{lastDay === "YYYY-MM-DD" ? "DD/MM/YYYY" : dayjs(lastDay).format("DD/MM/YYYY")}</Text>
                        </View>
                    </View>
                    {firstDay != "YYYY-MM-DD" && lastDay != "YYYY-MM-DD" &&
                        <Text>Tu programación tiene {dayjs(event_date).diff(dayjs(firstDay).format("YYYY-MM-DD"),'day')} días de anticipación al evento.</Text>
                    }
                    {firstDay != "YYYY-MM-DD" && lastDay != "YYYY-MM-DD" &&
                        <Text>Desgloce de costos </Text>
                    }
                    
                </View>
                <View style={styles.separator}/>
                {/* compo */}
                <View style={styles.rangoHoraContainer}>
                    <View>
                        <Text style={styles.dateTimeButtonsLabel}>Desde</Text>
                        <TimePicker style={styles.timePicker} onChangeTime={handleTimeChange}/>
                    </View>
                    <View >
                        <Text style={styles.dateTimeButtonsLabel}>Hasta</Text>
                        <TimePicker style={styles.timePicker}/>
                    </View>
                </View>

                <View style={styles.separator}/>
                <View style={styles.ultimoBloque}>
                    <Text>HORAS AL DIA</Text>
                    <Text>Desgloce de costos</Text>
                </View>
                
        </SafeAreaView>
    );
}

export default FeatureEventTimeDate