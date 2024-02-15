import { View,Text,SafeAreaView,Alert } from 'react-native';
import { useState } from 'react';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import PasswordTextInput from "../../common/PasswordTextInput/PasswordTextInput";
import LinkButton from '../../common/LinkButton/linkButton';
import styles from './PasswordRecoveryForm.style';
//import funcion from './funcion';
import {useRouter,Stack} from 'expo-router';
import {COLORS,SIZES} from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import {supabase} from '../../../src/lib/supabase';
import AppState from '../../../src/lib/refreshAuth';
import React from 'react';
import ModalOneButton from '../../common/Modal_1Button/Modal_1Button';


const PasswordRecoveryForm = () => {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const passwordRegex = new RegExp('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,15}$');
    const [isModalVisibleNotValidPassword, setIsModalVisibleNotValidPassword] = useState(false);
    const [isModalVisiblePasswordsDoNotMatch, setIsModalVisiblePasswordsDoNotMatch] = useState(false);

    async function ResetPassword(){
        if(password!==passwordConfirmation) setIsModalVisiblePasswordsDoNotMatch(true)
            else if (!passwordRegex.test(password)) setIsModalVisibleNotValidPassword(true)
            else {
                const { data, error } = await supabase.auth.updateUser({password: password})
                router.push('/users/login')
            }

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
        <Text style={styles.forgotPwdTitleText}>Restablece tu contraseña</Text>
        <PasswordTextInput placeholder='Nueva contraseña' style={{}} handleTextChange={setPassword} ></PasswordTextInput>
        <PasswordTextInput placeholder='Vuelve a escribir la contraseña' style={{}} handleTextChange={setPasswordConfirmation} ></PasswordTextInput>
        <Text style={styles.information}>Mínimo 8 caracteres, diferencia entre mayúsculas y minúsculas.</Text>
        <View style={styles.buttonContainer}><LinkButton text="Restablecer" handleNavigate={()=>{ResetPassword()}}></LinkButton></View>
        <ModalOneButton
                isVisible={isModalVisibleNotValidPassword}
                title="ola"
                message="La contraseña debe tener entre 8 y 15 caracteres, una letra mayúscula, un número y ningún espacio."
                buttonText="Cerrar"
                onPress={() => {setIsModalVisibleNotValidPassword(false)}}
                buttonColor={COLORS.white}
                textColor={COLORS.lightOrange}
            />
                <ModalOneButton
                isVisible={isModalVisiblePasswordsDoNotMatch}
                title="ola"
                message="Las contraseñas no coinciden."
                buttonText="Cerrar"
                onPress={() => {setIsModalVisiblePasswordsDoNotMatch(false)}}
                buttonColor={COLORS.white}
                textColor={COLORS.lightOrange}
            />
        </SafeAreaView>
        
        
    )
}

export default PasswordRecoveryForm;
