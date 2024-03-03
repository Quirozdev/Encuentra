import React, { useContext, useState } from "react"; 
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from "expo-router"
import SearchButton from "../../common/SearchButton/SearchButton";
import NavButton from "../../common/NavButton/NavButton";
import MyEventsList from "../MyEventsList/MyEventsList";

import styles from "./FeatureEvents.style";
import { COLORS } from "../../../constants/theme";
import { AuthContext } from "../../../src/providers/AuthProvider";

const MyEvents = ({}) => {
    const { session } = useContext(AuthContext)
    const [buttonType, setButtonType] = useState("back")
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventSelect = (eventId) => {
        console.log("Evento seleccionado", eventId);
        setSelectedEvent(eventId);
        setButtonType(eventId ? "next" : "back");
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
            <ScrollView>
                <View>
                    <Text style={styles.text}>Elige uno de tus eventos para destacar</Text>
                </View>
                <View>
                    <MyEventsList userId="b6d38bb3-c954-415b-baf8-b91f322d2e6e" onEventSelect={handleEventSelect}/>
                </View>
            </ScrollView>

        <SafeAreaView style={styles.footer}>
            <NavButton type={buttonType}/>
        </SafeAreaView>

        </SafeAreaView>
    );
}
export default MyEvents