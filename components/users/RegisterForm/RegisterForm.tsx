import {Text, View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import { useRouter, Stack } from "expo-router";

import styles from './RegisterForm.style';
import BaseTextInput from '../../common/BaseTextInput/BaseTextInput';
import LinkButton from '../../common/LinkButton/linkButton';
import ReturnButton from '../../common/ReturnButton/ReturnButton';

import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { useState } from 'react';





const RegisterForm = () => {
    const router = useRouter();
    const [nombres,setNombres] = useState('');
    const [validNombres,setValidNombres] = useState(true);
    const [apellidos,setApellidos] = useState('');
    const [validApellidos,setValidApellidos] = useState(true);
    const [email,setEmail] = useState('');
    const [validEmail,setValidEmail] = useState(true);
    const [contrasena,setContrasena] = useState('');
    const [validContrasena,setValidContrasena] = useState(true);
    const [celular,setCelular] = useState('');
    const [validCelular,setValidCelular] = useState(true);
    const [validForm, setValidForm] = useState(false)
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

    const handleSubmit = ({nombres, apellidos, email, contrasena, celular}) => {
        if (!nombres) {
            setValidNombres(false)
        } else {
            setValidNombres(true)
        }
        if (!apellidos) {
            setValidApellidos(false)
        } else {
            setValidApellidos(true)
        }
        if (!email) {
            setValidEmail(false)
        } else {
            setValidEmail(true)
        }
        if (!contrasena) {
            setValidContrasena(false)
        } else {
            setValidContrasena(true)
        }
        if (!celular) {
            setValidCelular(false)
        } else {
            setValidCelular(true)
        }
    }

    const handleChange = (field, value) => {
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
                        Registrarse
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <BaseTextInput placeholder='Nombre(s) *' style={validNombres ? styles.input : styles.badInput} onChangeText={setNombres}/>
                        <Text style={validNombres ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                    <BaseTextInput placeholder='Apellido(s) *' style={validApellidos ? styles.input : styles.badInput} onChangeText={setApellidos}/>
                        <Text style={validApellidos ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                    <BaseTextInput placeholder='Correo electrónico *' style={validEmail ? styles.input : styles.badInput} onChangeText={setEmail}/>
                        <Text style={validEmail ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                    <BaseTextInput placeholder='Contraseña *' style={validContrasena ? styles.input : styles.badInput} onChangeText={setContrasena}/>
                        <Text style={validContrasena ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                    <BaseTextInput placeholder='Celular *' style={validCelular ? styles.input : styles.badInput} onChangeText={setCelular}/>
                        <Text style={validCelular ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                </View>

                <View style={styles.button}>
                    <LinkButton text="Crear cuenta" handleNavigate={() => {handleSubmit({nombres,apellidos,email,contrasena,celular})}}/>
                </View>

                <View style={styles.textContainer}>
                    <Text style={{color:COLORS.red}}>
                        *
                        <Text style={styles.text}>
                            Campos son obligatorios
                        </Text>
                    </Text>
                </View>
            </ScrollView>
            <SafeAreaView style={styles.footer}>
                    <Text style={styles.text}>
                        ¿Ya tienes una cuenta?{' '}
                        <Text style={{color:COLORS.darkOrange, fontFamily:FONTS.RubikBold}} onPress={() => {router.push("/")}}>
                            Inicia Sesión
                        </Text>
                    </Text>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default RegisterForm