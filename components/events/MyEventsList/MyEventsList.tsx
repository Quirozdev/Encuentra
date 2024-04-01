import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, Text, FlatList, Image, ImageBackground, SafeAreaView } from "react-native";
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
import { CategoriesContext } from "../../../src/providers/CategoryProvider";

interface Props {
    events: Event[];
    onEventSelect: (id: string | null) => void;
}

const MyEventsList: React.FC<Props> = ({ events, onEventSelect }) => {
    const router = useRouter();
    const { categories } = useContext(CategoriesContext);
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [hasBeenSelected, setHasBeenSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [eventCategories, setEventCategories] = useState<number[]>([]);

    useEffect(() => {
        async function fetchEventCategories(eventId) {
            const { data, error } = await supabase
                .from('categorias_eventos')
                .select('id_categoria')
                .eq('id_evento', eventId);

            if (error) {
                console.error('Error fetching event categories:', error.message);
                return;
            }

            const categoryIds = data.map(category => category.id_categoria);
            setEventCategories(categoryIds);
        }

        if (selectedEvent) {
            fetchEventCategories(selectedEvent);
        }
    }, [selectedEvent]);

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

    function getEmojisForCategories(categoryIds) {
        return categoryIds.map(categoryId => {
            const category = categories.find(cat => cat.id == categoryId);
            return category ? category.emoji : null;
        });
    }

    const renderItem = ({ item }: { item: Event }) => {
        const emojis = getEmojisForCategories(eventCategories);
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <ImageBackground
                        imageStyle={{ borderRadius: 10 }}
                        source={{ uri: item.portada }}
                        style={styles.image}
                        resizeMode='cover'
                    />
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
                    <View style={styles.categoryContainer}>
                        {emojis.map((emoji, index) => (
                            <Text key={index} style={styles.category}>{emoji}asd</Text>
                        ))}
                    </View>
                    <View style={styles.addressContainer}>
                        <Map_Pin />
                        <Text style={styles.address}> {item.nombre_municipio} {item.nombre_estado}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            style={{ marginTop: -10 }}
        />
    );
};

export default MyEventsList;
