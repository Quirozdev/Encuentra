import { SafeAreaView, Text, View } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from 'expo-router';

import ReturnButton from "../../../../components/common/ReturnButton/ReturnButton";
import RegisterForm from "../../../../components/users/RegisterForm/RegisterForm"

export default function Register() {
    const router = useRouter();

    return (
        <SafeAreaView style={{backgroundColor:"#FFFFFF"}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor:"#FFFFFF"},
                    headerShadowVisible:false,
                    headerLeft: () => {
                        return <ReturnButton/>
                    },
                    headerTitle:""
                }}
            />

            <View>
               <RegisterForm/>
            </View>
        </SafeAreaView>
    )
}