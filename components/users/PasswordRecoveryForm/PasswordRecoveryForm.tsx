import { View,Text,SafeAreaView } from 'react-native';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import PasswordTextInput from "../../common/PasswordTextInput/PasswordTextInput";
import LinkButton from '../../common/LinkButton/linkButton';
import styles from './PasswordRecoveryForm.style';
//import funcion from './funcion';
import {useRouter,Stack,Link} from 'expo-router';
import {COLORS,SIZES} from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';

//ESTO ES UN CTRL+C CTRL+V DEL LOGIN, NO SE HA MODIFICADO TOVADÍA
const PasswordRecoveryForm = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
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
        <Link href="/users/passwordreset" style={styles.link}>
            <LinkButton text="¿Olvidaste tu contraseña?" handleNavigate={() => router.push("/users/passwordRecovery")}/>
        </Link>
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

export default PasswordRecoveryForm;