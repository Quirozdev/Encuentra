import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, Modal, Alert} from 'react-native';
import { useRouter, Stack, Link } from "expo-router";


import styles from './RegisterForm.style';
import BaseTextInput from '../../common/BaseTextInput/BaseTextInput';
import LinkButton from '../../common/LinkButton/linkButton';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import PasswordInput from '../../common/PasswordTextInput/PasswordTextInput';
import ModalOneButton from '../../common/Modal_1Button/Modal_1Button';
import { supabase } from '../../../src/lib/supabase';

import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { useState } from 'react';





const RegisterForm = () => {
    const passwordRegex = new RegExp('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,15}$');
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [validForm, setValidForm] = useState(false)
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

    async function signUpWithEmail() {
        setLoading(true)
        const {
          data: { session },
          error,
        } = await supabase.auth.signUp({
          email: fields.email,
          password: fields.contrasena,
          phone: fields.celular,
        })
    
        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
      }
    

    const handleSubmit = () => {
        
        const newValidFields = { ...validFields }
        for (let field in fields) {
            newValidFields[field] = Boolean(fields[field]);
        }
        setValidFields(newValidFields);

        const allFieldsAreValid = Object.values(newValidFields).every(value => value === true)
        const allFieldsHaveInput = Object.values(fields).every(value => value != '' )

        /*if (allFieldsAreValid && allFieldsHaveInput) {
            if (!passwordRegex.test(fields.contrasena)) {
                setIsModalVisible(true)
            } else {
                router.push("/users/verificationCode")
            }
            
        } 
        */

        router.push("/users/verificationCode")
        

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
                    <BaseTextInput
                     placeholder='Nombre(s) *'
                     style={validFields.nombres ? styles.input : styles.badInput}
                     onChangeText={(value) => handleChange('nombres',value)}
                     value={fields.nombres}/>
                        <Text style={validFields.nombres ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                    <BaseTextInput
                     placeholder='Apellido(s) *'
                     style={validFields.apellidos ? styles.input : styles.badInput}
                     onChangeText={(value) => handleChange('apellidos',value)}
                     value={fields.apellidos}/>
                        <Text style={validFields.apellidos ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                    <BaseTextInput
                     placeholder='Correo electrónico *'
                     inputMode='email' keyboardType='email-address'
                     style={validFields.email ? styles.input : styles.badInput}
                     onChangeText={(value) => handleChange('email',value)}
                     value={fields.email}/>
                        <Text style={validFields.email ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                    <PasswordInput
                     placeholder='Contraseña *'
                     style={validFields.contrasena ? styles.input : styles.badInput}
                     handleTextChange={(value) => handleChange('contrasena',value)}
                     />
                        <Text style={validFields.contrasena ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                    <BaseTextInput
                     placeholder='Celular *'
                     keyboardType='numeric'
                     inputType='numeric'
                     style={validFields.celular ? styles.input : styles.badInput}
                     onChangeText={(value) => handleChange('celular',value)}
                     value={fields.celular}/>
                        <Text style={validFields.celular ? styles.goodText : styles.badText}>Por favor, complete este campo</Text>
                </View>

                <View style={styles.button}>
                    <LinkButton text="Crear cuenta" handleNavigate={() => {handleSubmit()}}/>
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
                        <Text style={{color:COLORS.darkOrange, fontFamily:FONTS.RubikBold}} onPress={() => {router.replace("/users/login")}}>
                            Inicia Sesión
                        </Text>
                    </Text>
            </SafeAreaView>

            <ModalOneButton
                isVisible={isModalVisible}
                title="ola"
                message="La contraseña debe tener entre 8 y 15 caracteres, una letra mayúscula, un número y ningún espacio."
                buttonText="Cerrar"
                onPress={() => {setIsModalVisible(false)}}
                buttonColor={COLORS.white}
                textColor={COLORS.lightOrange}
            />
        </SafeAreaView>
    )
}

export default RegisterForm