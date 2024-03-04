import React, { useContext, useEffect, useState } from "react"; 
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
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

const MyEvents = ({}) => {
    const router = useRouter();
    const { session } = useContext(AuthContext)
    const [events, setEvents]  = useState<Event[]>([]);
    const [buttonType, setButtonType] = useState("back")
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDataAvailable, setIsDataAvailable] = useState('loading');

      const getEvents = async () => {
        console.log('EVENTOS: ',events)
        try {
            let query = supabase.from<Event>('eventos').select('*').eq('id_usuario', session.user.id);
            
            // if(word){
            //     query = query.ilike('name',`%${word}%`);
            // }
            
            const {data:eventData,error:fetchError} = await query;
    
            if(fetchError){
                console.error('Error fetching events', fetchError.message);
                return;
            }
    
            //si no hay error, seteamos el estado con los eventos
            setEvents(eventData || []);
            setTimeout(() => {
                setIsDataAvailable(eventData.length > 0 ? 'si' : 'no');
              }, 300);
            } catch (error) {
            console.error('Error fetching events', error.message);
        }
    }; 

    useEffect(()=>{
        getEvents();
    },[session.user.id]);

    const handleEventSelect = (eventId) => {
        console.log("Evento seleccionado", eventId);
        setSelectedEvent(eventId);
        setButtonType(eventId ? "next" : "back");
    }

    const handlePress = () => {
        if (buttonType === "back") router.back()
        if (buttonType === "next") router.push("/events/featureEventSelectDate")
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
            {isDataAvailable === 'loading' && <LoadingScreen/>}
            {isDataAvailable === 'si' && 
            <View style={{flex:1}}>
                <View>
                    <Text style={styles.text}>Elige uno de tus eventos para destacar</Text>
                </View>
                <View>
                    <MyEventsList events={events} onEventSelect={handleEventSelect}/>
                </View>
            </View>
            }
            {isDataAvailable === 'si' && 
                <SafeAreaView style={styles.footer}>
                    <NavButton type={buttonType} handlePress={handlePress}/>
                </SafeAreaView>
            }
            {isDataAvailable === 'no' &&
                <View style={styles.emptyContainer}>
                    <NoCreatedEvents/>
                </View>
                
            }
        </SafeAreaView>
    );
}
export default MyEvents