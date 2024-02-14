import { View,Text,SafeAreaView,Alert } from 'react-native';
import { useState } from 'react';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import PasswordTextInput from "../../common/PasswordTextInput/PasswordTextInput";
import LinkButton from '../../common/LinkButton/linkButton';
import styles from './ForgottenPasswordForm.style';
//import funcion from './funcion';
import {useRouter,Stack} from 'expo-router';
import {COLORS,SIZES} from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import {supabase} from '../../../src/lib/supabase';
import AppState from '../../../src/lib/refreshAuth';


const ForgottenPasswordForm = () => {
    const router = useRouter();

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
            placeholder='Correo electrónico o celular'
            inputMode='email' keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
        >
        </BaseTextInput>
        <View style={styles.buttonContainer}><LinkButton text="Enviar" handleNavigate={()=>{router.push('/users/verificationCode')}}></LinkButton></View>
        </SafeAreaView>
        
        
    )
}

export default ForgottenPasswordForm;