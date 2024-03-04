import React from "react";
import {Text, View,SafeAreaView} from "react-native";
import MyCalendar from "../../common/Calendar/Calendar";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { Stack } from "expo-router";


const FeatureEventTimeDate :React.FC = () => {
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                headerShown: true,
                headerStyle: {backgroundColor: "#FFFFFF"},
                headerShadowVisible: false,
                headerLeft: () => <ReturnButton />,
                headerTitle: "",
                }}
            />
            <View style={{flex:1}}>
                <MyCalendar/>
            </View>
        </SafeAreaView>
    );
}

export default FeatureEventTimeDate