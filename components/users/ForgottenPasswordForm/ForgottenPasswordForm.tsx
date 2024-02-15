import { View,Text,SafeAreaView,Alert } from 'react-native';
import { useState } from 'react';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import PasswordTextInput from "../../common/PasswordTextInput/PasswordTextInput";
import LinkButton from '../../common/LinkButton/linkButton';
import styles from './ForgottenPasswordForm.style';
import ModalOneButton from '../../common/Modal_1Button/Modal_1Button';
//import funcion from './funcion';
import {useRouter,Stack} from 'expo-router';
import {COLORS,SIZES} from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import {supabase} from '../../../src/lib/supabase';
import AppState from '../../../src/lib/refreshAuth';
import React from 'react';




const ForgottenPasswordForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const verificationType = "PasswordChange";
    const [isModalVisible, setIsModalVisible] = useState(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSubmit = () => {
        sendOtp(email);
        if(emailPattern.test(email)) {
            router.push({pathname:"/users/verificationCode", params:{email:email,verificationType:verificationType}})
        } else {
            setIsModalVisible(true);
        } 
    
    }
    async function sendOtp(email) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) Alert.alert(error.message)
        
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
                }}/>
        <Text style={styles.forgotPwdTitleText}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.information}>Introduce tu correo electrónico para obtener los pasos a seguir y recuperar tu contraseña.</Text>
        <BaseTextInput 
            style={styles.baseInput}
            placeholder='Correo electrónico'
            inputMode='email' keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
        >
        </BaseTextInput>
        <View style={styles.buttonContainer}><LinkButton text="Enviar" handleNavigate={() => {handleSubmit()}}></LinkButton></View>
        <ModalOneButton
                isVisible={isModalVisible}
                title="Correo no encontrado"
                message="Dirección de correo no válida.
                Por favor, asegúrate de haber introducido la dirección de correo electrónico correcta."
                buttonText="Cerrar"
                onPress={() => {setIsModalVisible(false)}}
                buttonColor={COLORS.white}
                textColor={COLORS.lightOrange}
            />
        </SafeAreaView>
        
        
    )
}

export default ForgottenPasswordForm;