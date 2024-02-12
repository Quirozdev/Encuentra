import { View,Text,SafeAreaView } from 'react-native';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import PasswordTextInput from "../../common/PasswordTextInput/PasswordTextInput";
import LinkButton from '../../common/LinkButton/linkButton';
import styles from './LogInForm.style';
//import funcion from './funcion';
import {useRouter,Stack} from 'expo-router';
import {COLORS,SIZES} from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';

const LogInForm = () => {
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
        <Text style={styles.text}>¡Bienvenido de nuevo a Encuentra!</Text>
        <BaseTextInput placeholder='Correo electrónico o celular' inputMode='email' keyboardType='email-address'></BaseTextInput>
        <PasswordTextInput placeholder='Contraseña' ></PasswordTextInput>
        <Text>¿Olvidaste tu contraseña?</Text>
        <LinkButton text="Iniciar Sesión" handleNavigate={() => {
            // if (funcion()) {
            //     router.push("/users/register");
            // }else{
            //     console.log('Error');
            // } si sirve esta estructura
        }}></LinkButton>
        </SafeAreaView>
    )
}

export default LogInForm;
