import React, { useEffect, useState, useRef } from "react";
import {Text, View,SafeAreaView, Animated, TouchableOpacity} from "react-native";
import MyCalendar from "../../common/Calendar/Calendar";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { Stack, useLocalSearchParams } from "expo-router";
import styles from './FeatureEventTimeDate.style';
import TimePicker from "../../common/TimePicker/TimePicker";
import dayjs from 'dayjs';


const FeatureEventTimeDate :React.FC = () => {
    const [firstDay, setFirstDay] = useState("YYYY-MM-DD");
    const [lastDay, setLastDay] = useState("YYYY-MM-DD");
    const [isDesgloceDiasActive, setIsDesgloceDiasActive] = useState(false)
    const moveAnim = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        Animated.timing(
          moveAnim,
          {
            toValue: 50, // move to original position
            duration: 1000, // in 1 second
            useNativeDriver: true, // use native driver for better performance
          }
        ).start();
      };

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
                    {/* Esta es la estructura de las fechas*/}
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
                        <Text style={styles.infoAnticipacion}>Tu programación tiene {dayjs(event_date).diff(dayjs(firstDay).format("YYYY-MM-DD"),'day')} días de anticipación al evento.</Text>
                    }
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.infoAnticipacion}>Desgloce de costos </Text>
                    </TouchableOpacity>
                    
                    
                    <Animated.View style={{transform:[{translateY: moveAnim}]}}>
                        <Text>ola pirrins</Text>
                    </Animated.View>
                        
                </View>

                <View style={styles.separator2}/>

                {/* Esta es la estructura de las horas */}
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