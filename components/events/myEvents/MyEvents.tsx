import React, { useContext, useEffect, useRef, useState } from "react"; 
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from "expo-router"
import SearchButton from "../../common/SearchButton/SearchButton";
import NavButton from "../../common/NavButton/NavButton";
import MyEventsProfile from "../MyEventsList/MyEventsProfile";
import { useRouter } from "expo-router";
import { Event } from "../../../src/types/events.types";
import { EventsContext } from "../../../src/providers/EventsProvider";

import styles from "./MyEvents.style";
import { COLORS } from "../../../constants/theme";
import { AuthContext } from "../../../src/providers/AuthProvider";
import { supabase } from "../../../src/supabase";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";
import NoCreatedEvents, { NoCreatedEventsHistory } from "../../common/NoCreatedEvents/NoCreatedEvents";
import SearchBar from "../../common/SearchBar/SearchBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Portal } from "@gorhom/portal";
import BottomSheet, { BottomSheetRefProps } from "../../common/BottomSheet/BottomSheet";
import FilterEvent from "../FilterEvent/FilterEvent";
import ChangeLocationForm from "../ChangeLocationForm/ChangeLocationForm";

interface ModalType {
    type: "filter" | "";
  }

const MyEvents = () => {
    const router = useRouter();
    const { session } = useContext(AuthContext)
    const [events, setEvents]  = useState<Event[]>([]);
    const [unfilteredEvents, setUnfilteredEvents] = useState<Event[]>([]);
    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [openModal, setOpenModal] = useState<ModalType>({ type: "" });
    const [buttonType, setButtonType] = useState("back")
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDataAvailable, setIsDataAvailable] = useState('loading');
    const ref = useRef<BottomSheetRefProps>(null);
    const viewRef = useRef(null);

      const getEvents = async () => {
        //console.log('EVENTOS: ',events)
        try {
            let query = supabase.from('eventos').select('*').eq('id_usuario', session.user.id);

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
            setUnfilteredEvents(eventData || []);
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

    function searchEvents(searchTerm) {
        setSearchPhrase(searchTerm);

        if (searchTerm == "") {
            setEvents(unfilteredEvents);
        } else {
            const searchTermLower = searchTerm.toLowerCase();
            setEvents(
            events.filter((event) =>
                event.nombre.toLowerCase().includes(searchTermLower)
            )
            );
        }
    }

    function handleBottomSheet(height: number) {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(500);
        } else {
            ref?.current?.scrollTo(height);
        }
    }

    const handleEventSelect = (eventId) => {
        console.log("Evento seleccionado", eventId);
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
    
    function openFilterModal() {
        setOpenModal({ type: "filter" });
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
                }}
            />
            {isDataAvailable === 'loading' && <LoadingScreen/>}
            <View style={[styles.row, styles.center, styles.search]}>
                <TouchableOpacity onPress={openFilterModal}>
                  <MaterialCommunityIcons
                    name="filter"
                    size={30}
                    color={COLORS.darkMint}
                  />
                </TouchableOpacity>
                <SearchBar
                  clicked={clicked}
                  searchPhrase={searchPhrase}
                  setSearchPhrase={searchEvents}
                  setClicked={setClicked}
                />
              </View>
            <BottomSheet ref={ref}>
                <View ref={viewRef} collapsable={false}>
                    {openModal.type == "filter" ? (
                    <FilterEvent scrollTo={ref?.current?.scrollTo} />
                    ) : (
                    <ChangeLocationForm scrollTo={ref?.current?.scrollTo} />
                    )}
                </View>
            </BottomSheet>
            {isDataAvailable === 'si' && 
            <View style={{flex:1}}>
                <View>
                    <Text style={styles.text}>Historial de Eventos</Text>
                </View>
                <View>
                    <MyEventsProfile events={events} onEventSelect={handleEventSelect}/>
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
                    <NoCreatedEventsHistory/>
                </View>
                
            }
        </SafeAreaView>
    )
}
export default MyEvents;