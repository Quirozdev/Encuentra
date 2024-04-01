import React,{useState,useEffect} from "react";
import { View, TouchableOpacity,Text,FlatList,Image,ImageBackground, SafeAreaView} from "react-native"; 
import { useRouter } from "expo-router";
import { supabase } from "../../../src/supabase";
import Moment from "moment";
import 'moment/locale/es';

import styles from './MyEventsList.styles';
import Map_Pin from '../../../assets/images/map-pin.svg';
import CheckMarkCircle from '../../../assets/images/check-mark-circle_svgrepo.com.svg';
import CreateEventButton from "../../common/CreateEventButton/CreateEventButton";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";
import { Event } from "../../../src/types/events.types";



interface Props{
    events: Event[];
    onEventSelect: (id: string | null) => void;
}

const MyEventsList: React.FC<Props> = ({events,onEventSelect}) => {
const router = useRouter();

const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
const [hasBeenSelected, setHasBeenSelected] = useState(false);
const [isLoading, setIsLoading] = useState(false)

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

const renderItem = ({ item }: { item:Event }) => {
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