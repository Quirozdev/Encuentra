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
import {supabase} from '../../../src/supabase';
import AppState from '../../../src/lib/refreshAuth';
import React from 'react';
import ModalOneButton from '../../common/Modal_1Button/Modal_1Button';
import ModalTwoButton from '../../common/Modal_2Button/Modal_2Button';


const PasswordRecoveryForm = () => {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const passwordRegex = new RegExp('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,15}$');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    async function ResetPassword(){
        if(password!==passwordConfirmation) {
            setModalMessage("Las contraseñas no coinciden")
            setIsModalVisible(true)
        }
            else if (!passwordRegex.test(password)) 
        {
            setModalMessage("La contraseña debe tener entre 8 y 15 caracteres, una letra mayúscula, un número y ningún espacio.")
            setIsModalVisible(true)
        }
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
        isVisible={isModalVisible}
        title="ola"
        message={modalMessage}
        buttonText="Cerrar"
        onPress={() => {
          setIsModalVisible(false);
        }}
        buttonColor={COLORS.white}
        textColor={COLORS.lightOrange}
        exitButtonPress={() => {
          setIsModalVisible(false);
        }}
      />
        </SafeAreaView>
        
        
    )
}

export default PasswordRecoveryForm;
