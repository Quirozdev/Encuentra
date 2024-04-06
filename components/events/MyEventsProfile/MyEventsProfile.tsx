import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, Text, FlatList, Image, ImageBackground, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import Moment from "moment";
import 'moment/locale/es';
import { supabase } from "../../../src/supabase";

import styles from './MyEventsProfile.style';
import Map_Pin from '../../../assets/images/map-pin.svg';
import CheckMarkCircle from '../../../assets/images/check-mark-circle_svgrepo.com.svg';
import CreateEventButton from "../../common/CreateEventButton/CreateEventButton";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";
import { Event } from "../../../src/types/events.types";
import { CategoriesContext } from "../../../src/providers/CategoryProvider";
import { AuthContext } from "../../../src/providers/AuthProvider"; 

interface Props {
    events: Event[];
    onEventSelect: (id: string | null) => void;
}

const MyEventsProfile: React.FC<Props> = ({ events, onEventSelect }) => {
    const router = useRouter();
    const { categories } = useContext(CategoriesContext);
    const { session } = useContext(AuthContext);
    const [eventCategories, setEventCategories] = useState<{ [eventId: string]: { emoji: string, color: string }[] }>({});

    useEffect(() => {
        async function fetchEventCategories() {
            const eventCategoriesMap: { [eventId: string]: { emoji: string, color: string }[] } = {};
            for (const event of events) {
                const { data: eventData, error: eventError } = await supabase
                    .from('categorias_eventos')
                    .select('id_categoria')
                    .eq('id_evento', event.id);

                if (eventError) {
                    console.error(`Error fetching categories for event ${event.id}:`, eventError.message);
                    continue;
                }

                const categoryIds = eventData.map(category => category.id_categoria);
                const eventCategoriesData = categoryIds.map(categoryId => {
                    const category = categories.find(cat => cat.id === categoryId);
                    return category ? { emoji: category.emoji, color: category.color } : null;
                }).filter(category => category !== null);

                eventCategoriesMap[event.id] = eventCategoriesData;
            }

            setEventCategories(eventCategoriesMap);
        }

        fetchEventCategories();
    }, [events, categories]);

    function capitalizeFirstLetterOfEachWord(string) {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const renderItem = ({ item }: { item: Event }) => {
        const categoriesData = eventCategories[item.id] || [];
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
                        {categoriesData.map((category, index) => (
                            <View key={index} style={[styles.categoryCircle, { backgroundColor: category.color }]}>
                                <Text style={styles.category}>{category.emoji}</Text>
                            </View>
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

export default MyEventsProfile;
