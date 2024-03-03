import React,{useState,useEffect} from "react";
import { View, TouchableOpacity,Text,FlatList,Image,ImageBackground} from "react-native"; 
import { supabase } from "../../../src/supabase";
import Moment from "moment";
import 'moment/locale/es';

import styles from './MyEventsList.styles';
import Map_Pin from '../../../assets/images/map-pin.svg';
import CheckMarkCircle from '../../../assets/images/check-mark-circle_svgrepo.com.svg';


interface Evento {
    id: number;
    created_at: Date;
    nombre: string;
    descripcion: string | null;
    fecha: Date;
    hora: string;
    duracion: number;
    latitud_ubicacion: number;
    longitud_ubicacion: number;
    nombre_estado: string;
    nombre_municipio: string;
    direccion: string | null;
    portada: string | null;
    id_usuario: string;
    estatus: string | null;
    costo: number;
}

interface Props{
    userId: string;
    word?: string;
    onEventSelect: (id: string | null) => void;
}

const MyEventsList: React.FC<Props> = ({userId, word,onEventSelect}) => {
const [events, setEvents]  = useState<Evento[]>([]);
const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
const [hasBeenSelected, setHasBeenSelected] = useState(false);


useEffect(()=>{
    const getEvents = async () => {
        try {
            let query = supabase.from<Evento>('eventos').select('*').eq('id_usuario', userId);
            
            if(word){
                query = query.ilike('name',`%${word}%`);
            }
    
            const {data:eventData,error:fetchError} = await query;
    
            if(fetchError){
                console.error('Error fetching events', fetchError.message);
                return;
            }
    
            //si no hay error, seteamos el estado con los eventos
            setEvents(eventData || []);
        } catch (error) {
            console.error('Error fetching events', error.message);
        }
    }; 
    getEvents();
},[userId,word]);

const handleEventPress = (id) => {
    if (selectedEvent === id) {
        setSelectedEvent(null);
        setHasBeenSelected(false);
        onEventSelect(null);
    } else {
        setSelectedEvent(id);
        setHasBeenSelected(true);
        onEventSelect(id);
    }
};

function capitalizeFirstLetterOfEachWord(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const renderItem = ({ item }: { item:Evento }) => {
    const isSelected = item.id === selectedEvent;
    return (
        <TouchableOpacity 
            style={[
                styles.container,
                isSelected ? styles.selectedContainer : hasBeenSelected && !isSelected ? styles.unselectedContainer : null
            ]}
            onPress={() => {handleEventPress(item.id)}}
        >
            <View style={styles.imageContainer}>
                <ImageBackground 
                    imageStyle={{borderRadius:10}} 
                    source={{uri: item.portada }} 
                    style={styles.image} 
                    resizeMode='cover'
                />
                {isSelected && <CheckMarkCircle width={40} height={40} style={{position:'absolute', top:'28%',left:'-39%'}} />}
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.dateAndTimeContainer}>
                    <Text style={styles.dateAndTime}>{capitalizeFirstLetterOfEachWord(Moment(item.fecha).locale('es').format('ddd MMM D'))}</Text>
                    <Text style={styles.dateAndTime}> • </Text>
                    <Text style={styles.dateAndTime}>{Moment(item.hora, 'HH:mm').format('h:mm A')}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.nombre}</Text>
                </View>
                <View style={styles.addressContainer}>
                    <Map_Pin/>
                    <Text style={styles.address}> {item.nombre_municipio} {item.nombre_estado}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
    
return (
        <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{height: 20}}/>}
            style={{marginTop: -10}}
        />
);
};

export default MyEventsList;