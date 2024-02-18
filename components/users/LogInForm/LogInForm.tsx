import { View, Text, SafeAreaView, Alert,Animated} from 'react-native';
import { useState, useEffect } from 'react';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import PasswordTextInput from "../../common/PasswordTextInput/PasswordTextInput";
import LinkButton from '../../common/LinkButton/linkButton';
import styles from './LogInForm.style';
import { useRouter, Stack } from 'expo-router';
import { COLORS, SIZES } from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import { supabase } from '../../../src/supabase';
import AppState from '../../../src/lib/refreshAuth';
import React from 'react';
import { set } from 'date-fns';

const LogInForm = () => {
    const router = useRouter();

    const [username, setUsername] = useState<string>('');//puede ser email o celular
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [errorPwd, setErrorPwd] = useState<string>('');
    const [loading, setLoading] = useState(false)
    const [opacity] = useState(new Animated.Value(1));

    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const checkInputType = () => {
        if (username === ''){
            setError('Por favor ingrese un correo o celular valido');
            setErrorPwd('Por favor ingrese una contraseña valida');
            return '';
        }
        if (emailRegex.test(username)) return 'email';
        if (phoneRegex.test(username)) return 'celular';
    }

    const signInWithPhone = async () => {
        setLoading(true);
        const { data, error: errorcito } = await supabase
            .from('usuarios')
            .select('email')
            .eq('celular', username)
            .single();
        if (errorcito) {
                setError('El correo o celular no coinciden');
                setErrorPwd('La contraseña es incorrecta');
                setLoading(false);
                return;
        }
        const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: password
        });
        if (error) {
            setError('El correo o celular no coinciden');
            setErrorPwd('La contraseña es incorrecta');
            setLoading(false);
            return;
        }
        router.replace('/events');
        setLoading(false);
    }

    const signInWithEmail = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password
        });
        if (error) {
                setError('El correo o celular no coinciden');
                setErrorPwd('La contraseña es incorrecta');
                setLoading(false);
                return;
        }
        router.replace('/events');
        setLoading(false);
    }


    useEffect(() => {
    
        // Limpiar el error después de 3 segundos
        const timer = setTimeout(() => {
          setError('');
          setErrorPwd('');
        }, 5000);
      
        // Limpiar el temporizador cuando el componente se desmonte o se actualice
        return () => clearTimeout(timer);
      }, [error, opacity]);



    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: COLORS.white },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ReturnButton />
                    ),
                    headerTitle: ""
                }} />
            <Text style={styles.welcomeText}>¡Bienvenido de nuevo a Encuentra!</Text>
            <View style={styles.subContainer}>
                <BaseTextInput
                    style={error === '' ? styles.baseInput : styles.inputError}
                    placeholder='Correo electrónico o celular'
                    inputMode='email' keyboardType='email-address'
                    onChangeText={(text) => setUsername(text)}
                    autoCapitalize='none'
                />
                <Animated.Text style={styles.errorText}>{error}</Animated.Text>
                <PasswordTextInput placeholder='Contraseña' style={error === '' ? {} : styles.inputError} handleTextChange={setPassword} />
                <Animated.Text style={styles.errorText}>{errorPwd}</Animated.Text>
            </View>
            <Text style={styles.forgotPwdText} onPress={() => router.push("/users/forgottenPassword")}>¿Has olvidado tu contraseña?</Text>
            <View style={styles.buttonContainer}>
                <LinkButton text="Iniciar Sesión" handleNavigate={(username) => {
                    let inputType = checkInputType();
                    if (inputType === 'email') {
                        signInWithEmail();
                    }
                    if (inputType === 'celular') {
                        signInWithPhone();
                    }
                }} />
            </View>

            <Text style={styles.noAccountText}>¿No tienes una cuenta? <Text onPress={() => { router.replace('/users/register') }} style={{ color: COLORS.darkOrange }}>Regístrate</Text></Text>

        </SafeAreaView>


    )
}

export default LogInForm;