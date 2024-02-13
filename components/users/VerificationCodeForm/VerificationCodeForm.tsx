import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, Modal, Alert} from 'react-native';
import { useRouter, Stack, Link } from "expo-router";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'


import styles from './VerificationCodeForm.style';
import BaseTextInput from '../../common/BaseTextInput/BaseTextInput';
import LinkButton from '../../common/LinkButton/linkButton';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import PasswordInput from '../../common/PasswordTextInput/PasswordTextInput';
import ModalOneButton from '../../common/Modal_1Button/Modal_1Button';

import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { useState } from 'react';





const VerificationCodeForm = () => {
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
    const router = useRouter();
    const [isLoading, setLoading] = useState(false)
    const [fields, setFields] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        contrasena: '',
        celular: '',
    })
    const [validFields, setValidFields] = useState({
        nombres: true,
        apellidos: true,
        email: true,
        contrasena: true,
        celular: true,
    })

    const handleSubmit = () => {  

    }

    const handleChange = (field, value) => {
        if (field === 'email') {
            console.log("es un correo")
        }
        setFields({
            ...fields,
            [field]:value
        })
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
                    if (text.length === 6) router.push("/users/selectLocation")
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
                        <Text style={{color:COLORS.darkOrange, fontFamily:FONTS.RubikBold}} onPress={() => {router.replace("/users/login")}}>
                            Reenviar
                        </Text>
                    </Text>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default VerificationCodeForm