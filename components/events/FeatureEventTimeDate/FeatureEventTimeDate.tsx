import React, { useEffect, useState, useRef } from "react";
import {Text, View,SafeAreaView, Animated, TouchableOpacity, ScrollView} from "react-native";
import MyCalendar from "../../common/Calendar/Calendar";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { Stack, useLocalSearchParams } from "expo-router";
import styles from './FeatureEventTimeDate.style';
import TimePicker from "../../common/TimePicker/TimePicker";
import dayjs from 'dayjs';
import { useAnimatedStyle, withSpring } from "react-native-reanimated";
import DesgloceCostos from "../../common/DesgloceCostosOpener/DesgloceCostosOpener";



const FeatureEventTimeDate :React.FC = () => {
    //FORMATO DE FECHA DE EVENTO 2024-03-11 YYYY-MM-DD
    const UNSET_DATE = "YYYY-MM-DD";
    const DISPLAY_DATE_FORMAT = "DD/MM/YYYY";
    const rangosFechasVacios = {
    "3meses":[],
    "2meses":[],
    "1mes":[],
    "3dias":[],
    "diaevento":[]

    }

    const [firstDay, setFirstDay] = useState(UNSET_DATE);
    const [lastDay, setLastDay] = useState(UNSET_DATE);
    const [isDesgloceDiasActive, setIsDesgloceDiasActive] = useState(false)
    const [rangosFechasCobrados, setRangosFechasCobrados] = useState(rangosFechasVacios);
    const [isFlipped, setIsFlipped] = useState(false)

    useEffect(() => {
        if (!(firstDay === UNSET_DATE) && !(lastDay === UNSET_DATE)) {
            let rangosFechasCopy = {...rangosFechasVacios};
            let currentDay = dayjs(firstDay);
            let diaEvento = dayjs(event_date)
            let lastDayDate = dayjs(lastDay)
            while (currentDay <= lastDayDate) {
                let diferencia_meses = Math.ceil(diaEvento.diff(currentDay,'month',true));
                let diferencia_dias = diaEvento.diff(currentDay,'day',true);
                switch (true) {
                    case (diferencia_meses >= 3):
                        rangosFechasCopy["3meses"].push(currentDay.format(DISPLAY_DATE_FORMAT));
                        break;
                    case (diferencia_meses >= 2 && diferencia_meses < 3):
                        rangosFechasCopy["2meses"].push(currentDay.format(DISPLAY_DATE_FORMAT));
                        break;
                    case (diferencia_meses < 2 && diferencia_meses <= 1 && diferencia_dias > 3):
                        rangosFechasCopy["1mes"].push(currentDay.format(DISPLAY_DATE_FORMAT));
                        break;
                    case (diferencia_dias <= 3 && diferencia_dias != 0):
                        rangosFechasCopy["3dias"].push(currentDay.format(DISPLAY_DATE_FORMAT));
                        break;
                    case (diferencia_dias === 0):
                        rangosFechasCopy["diaevento"].push(currentDay.format(DISPLAY_DATE_FORMAT));
                        break;
                    default:
                        break;
                }
                currentDay = currentDay.add(1,'day')
            }
            setRangosFechasCobrados(rangosFechasCopy)
        }

      }, [lastDay]);

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
            <ScrollView>
                <View style={styles.calendarContainer}>
                    <MyCalendar fecha_inicio={event_date} onFirstDaySelect={setFirstDay} onLastDaySelect={setLastDay}/>
                </View>   
                <View style={styles.separator}/>
                <View>
                    {/* Esta es la estructura de las fechas*/}
                    <View style={styles.rangoFechaContainer}>
                        <View>
                            <Text style={styles.dateTimeButtonsLabel}>Desde</Text>
                            <Text style={styles.dateButton}>{firstDay === UNSET_DATE ? DISPLAY_DATE_FORMAT : dayjs(firstDay).format(DISPLAY_DATE_FORMAT)}</Text>
                        </View>
                        <View>
                            <Text style={styles.dateTimeButtonsLabel}>Hasta</Text>
                            <Text style={styles.dateButton}>{lastDay === UNSET_DATE ? DISPLAY_DATE_FORMAT : dayjs(lastDay).format(DISPLAY_DATE_FORMAT)}</Text>
                        </View>
                    </View>

                    {firstDay != "YYYY-MM-DD" && lastDay != "YYYY-MM-DD" &&
                        <Text style={styles.infoAnticipacion}>Tu programación tiene {dayjs(event_date).diff(dayjs(firstDay).format(UNSET_DATE),'day')} días de anticipación al evento.</Text>
                    }
                    
                    { firstDay != "YYYY-MM-DD" && lastDay != "YYYY-MM-DD" && 
                        <TouchableOpacity style={{paddingVertical:5}} onPress={() => {setIsDesgloceDiasActive(!isDesgloceDiasActive); setIsFlipped(!isFlipped)}}>
                            <DesgloceCostos isFlipped={isFlipped}/>
                        </TouchableOpacity>
                    }

                    { isDesgloceDiasActive && firstDay != "YYYY-MM-DD" && lastDay != "YYYY-MM-DD" && 
                        <View>
                            { rangosFechasCobrados["3meses"].length > 0 &&
                                <View style={styles.rangosDiasContainer}>
                                    <Text style={styles.rangosText}>{rangosFechasCobrados["3meses"][0]} - {rangosFechasCobrados["3meses"][rangosFechasCobrados["3meses"].length-1]}</Text>
                                    <Text style={styles.rangosText}> $1.00/hora</Text>
                                </View>
                            }
                            { rangosFechasCobrados["2meses"].length > 0 &&
                                <View style={styles.rangosDiasContainer}>
                                    <Text style={styles.rangosText}>{rangosFechasCobrados["2meses"][0]} - {rangosFechasCobrados["2meses"][rangosFechasCobrados["2meses"].length-1]}</Text>
                                    <Text style={styles.rangosText}> $2.00/hora</Text>
                                </View>
                            }
                            { rangosFechasCobrados["1mes"].length > 0 &&
                                <View style={styles.rangosDiasContainer}>
                                    <Text style={styles.rangosText}>{rangosFechasCobrados["1mes"][0]} - {rangosFechasCobrados["1mes"][rangosFechasCobrados["1mes"].length-1]}</Text>
                                    <Text style={styles.rangosText}> $5.00/hora</Text>
                                </View>
                            }
                            { rangosFechasCobrados["3dias"].length > 0 &&
                                <View style={styles.rangosDiasContainer}>
                                    <Text style={styles.rangosText}>{rangosFechasCobrados["3dias"][0]} - {rangosFechasCobrados["3dias"][rangosFechasCobrados["3dias"].length-1]}</Text>
                                    <Text style={styles.rangosText}> $10.00/hora</Text>
                                </View>
                            }
                            { rangosFechasCobrados["diaevento"].length > 0 &&
                                <View style={styles.rangosDiasContainer}>
                                    <Text style={styles.rangosText}>{dayjs(event_date).format("DD/MM/YYYY")}</Text>
                                    <Text style={styles.rangosText}>$20.00/hora</Text>
                                </View>
                            }
                        </View>
                    }
                        
                        
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
                </ScrollView>
        </SafeAreaView>
    );
}

export default FeatureEventTimeDate