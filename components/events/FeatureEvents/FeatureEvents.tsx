import React, { useContext, useEffect, useState } from "react"; 
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Stack } from "expo-router"
import SearchButton from "../../common/SearchButton/SearchButton";
import NavButton from "../../common/NavButton/NavButton";
import MyEventsList from "../MyEventsList/MyEventsList";
import { useRouter } from "expo-router";
import { Event } from "../../../src/types/events.types";

import styles from "./FeatureEvents.style";
import { COLORS } from "../../../constants/theme";
import { AuthContext } from "../../../src/providers/AuthProvider";
import { supabase } from "../../../src/supabase";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";
import NoCreatedEvents from "../../common/NoCreatedEvents/NoCreatedEvents";

const FeatureEvents = () => {
    const router = useRouter();
    const { session } = useContext(AuthContext)
    const [events, setEvents]  = useState<Event[]>(null);
    const [buttonType, setButtonType] = useState("back")
    const [selectedEvent, setSelectedEvent] = useState(null);

      const getEvents = async () => {
        //console.log('EVENTOS: ',events)
        try {
            let query = supabase.from('eventos').select('*').eq('id_usuario', session.user.id).eq('estatus','disponible');

            // if(word){
            //     query = query.ilike('name',`%${word}%`);
            // }

            const {data:eventData,error:fetchError} = await query;

            if(fetchError){
                console.error('Error fetching events', fetchError.message);
                return;
            }
            console.log(events)
            //si no hay error, seteamos el estado con los eventos
            console.log(eventData);
            setEvents(eventData || []);
            } catch (error) {
            console.error('Error fetching events', error.message);
        }
    }; 

    useEffect(()=>{
        getEvents();
    },[]);

    const handleEventSelect = (eventId) => {
        setSelectedEvent(eventId);
        setButtonType(eventId ? "next" : "back");
    }

    function getFechaEvento(eventId){
        let evento = events.filter(event => event.id === eventId);
        return evento[0].fecha;
    }

    function getHoraInicioEvento(eventId){
        let evento = events.filter(event => event.id === eventId);
        return evento[0].hora;
    }

    const handlePress = () => {
        if (buttonType === "back") router.back()
        if (buttonType === "next") router.push({pathname:"/events/selectDate", params:{
            fecha_inicio:getFechaEvento(selectedEvent),
            hora:getHoraInicioEvento(selectedEvent),
            evento:selectedEvent
        }})
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                headerShown: true,
                headerStyle: styles.headerBackground,
                headerShadowVisible: false,
                headerLeft: () => <ReturnButton />,
                headerTitle: "Mis eventos",
                headerTitleStyle: styles.headerTitleStyle,
                headerRight: () => <SearchButton/>
                }}
            />
                    {events == null ? <View style={{alignItems:'center',justifyContent:'center',flex:1}}><ActivityIndicator  size="small"/></View>

            :
            events.length > 0 ?
            <>
            <View style={{flex:1}}>
                <View>
                    <Text style={styles.text}>Elige uno de tus eventos para destacar</Text>
                </View>
                <View>
                    <MyEventsList events={events} onEventSelect={handleEventSelect}/>
                </View>
            </View>
            <SafeAreaView style={styles.footer}>
            <NavButton type={buttonType} handlePress={handlePress}/>
        </SafeAreaView>
        </>
            : 
                <View style={styles.emptyContainer}>
                    <NoCreatedEvents/>
                </View>
                
            }
        </SafeAreaView>
    )
}
export default FeatureEvents;