import { View,Text,SafeAreaView,Alert } from 'react-native';
import { useState } from 'react';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import PasswordTextInput from "../../common/PasswordTextInput/PasswordTextInput";
import LinkButton from '../../common/LinkButton/linkButton';
import styles from './LogInForm.style';
//import funcion from './funcion';
import {useRouter,Stack} from 'expo-router';
import {COLORS,SIZES} from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import {supabase} from '../../../src/lib/supabase';


const LogInForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
            const { data,error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
              })
              if (error) Alert.alert(error.message)
              setLoading(false)
            console.log("data en signInWithEmail: ",data)
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
        <Text style={styles.welcomeText}>¡Bienvenido de nuevo a Encuentra!</Text>
        <BaseTextInput 
            style={styles.baseInput}
            placeholder='Correo electrónico o celular'
            inputMode='email' keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
            autoCapitalize='none'
        >
        </BaseTextInput>
        <PasswordTextInput placeholder='Contraseña' style={{}} handleTextChange={setPassword}></PasswordTextInput>
        <Text style={styles.forgotPwdText} onPress={() => router.push("/users/login")}>¿Has olvidado tu contraseña?</Text>
        <View style={styles.buttonContainer}><LinkButton text="Iniciar Sesión" handleNavigate={() => signInWithEmail()}></LinkButton></View>
        <Text style={styles.noAccountText}>¿No tienes una cuenta? <Text onPress={()=>{router.replace('/users/register')}} style={{color:COLORS.darkOrange}}>Regístrate</Text></Text>
        </SafeAreaView>
        
        
    )
}

export default LogInForm;
