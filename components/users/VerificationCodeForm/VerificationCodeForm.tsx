import { Text, View, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { supabase } from '../../../src/lib/supabase';


import styles from './VerificationCodeForm.style';
import ReturnButton from '../../common/ReturnButton/ReturnButton';


import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { useState } from 'react';
import React from 'react';

const VerificationCodeForm = () => {
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
    const router = useRouter();
    const email = String(useLocalSearchParams().email);
    const verificationType = String(useLocalSearchParams().verificationType);
    const [isLoading, setLoading] = useState(false)



    async function verifyCode(code) {
        setLoading(true)
        const { error } = await supabase.auth.verifyOtp({ token:String(code), type: 'email', email: email});
        if (error) Alert.alert(error.message)
        else {
            if(verificationType==="PasswordChange"){
                router.push("/users/passwordRecovery");
            }
            else router.push("/");

        }
        setLoading(false)
    }
    async function sendOtp(email) {
        setLoading(true)
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) Alert.alert(error.message)
        setLoading(false)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.white},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ReturnButton/>
                    ),
                    headerTitle: ""
                }}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Código de verificación
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Ingresa el código de verificación que acabamos de enviar a su dirección de correo electrónico.
                    </Text>
                </View>

            <CodeField
                ref={ref}
                {...props} 
                value={value}
                onChangeText={(text) => {
                    setValue(text);
                    if (text.length === 6) {
                        verifyCode(text)
                    } 
                }}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />

            </ScrollView>
            <SafeAreaView style={styles.footer}>
                    <Text style={styles.text}>
                        ¿No recibiste el código?{' '}
                        <Text style={{color:COLORS.darkOrange, fontFamily:FONTS.RubikBold}} onPress={() => {sendOtp(email)}}>
                            Reenviar
                        </Text>
                    </Text>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default VerificationCodeForm