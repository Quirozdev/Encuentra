import React,{useState,useEffect} from "react";
import { View, TouchableOpacity,Text,FlatList,Image,ImageBackground, SafeAreaView} from "react-native"; 
import { useRouter } from "expo-router";
import { supabase } from "../../../src/supabase";
import Moment from "moment";
import 'moment/locale/es';

import styles from './NoCreatedEvents.style';
import Map_Pin from '../../../assets/images/map-pin.svg';
import CheckMarkCircle from '../../../assets/images/check-mark-circle_svgrepo.com.svg';
import CreateEventButton from "../../common/CreateEventButton/CreateEventButton";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";


const NoCreatedEvents = () => {
    const router = useRouter();
    return (
        <SafeAreaView>
            <View style={styles.emptyContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.emptyText}>Aún no has creado ningún evento o no tienes eventos disponibles.</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <CreateEventButton handlePress={()=>{router.replace("/events/create")}}/>
                    <TouchableOpacity onPress={() => {router.back()}} style={{marginTop:20}}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const NoCreatedEventsHistory = () => {
    const router = useRouter();
    return (
        <SafeAreaView>
            <View style={styles.emptyContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.emptyText}>Aún no tienes eventos creados. ¿Qué tal si organizas el primero ahora? ¡Comienza aquí!</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <CreateEventButton handlePress={()=>{router.replace("/events/create")}}/>
                    <TouchableOpacity onPress={() => {router.back()}} style={{marginTop:20}}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const NoResultedEventsHistory = () => {
    const router = useRouter();
    return (
        <SafeAreaView>
            <View style={styles.emptyContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.emptyText}>Sin resultados. Prueba con otros términos</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default NoCreatedEvents;
export {NoCreatedEventsHistory,NoResultedEventsHistory};