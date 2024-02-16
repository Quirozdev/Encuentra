import 'react-native-url-polyfill/auto';
import { SafeAreaView, Text } from "react-native";
import { useState, useEffect } from 'react';
import LogInForm from "../../../../components/users/LogInForm/LogInForm";
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';
import LinkButton from "../../../../components/common/LinkButton/linkButton";
import {useRouter} from 'expo-router';

export default function LogIn() {
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            console.log("session en getSession: ",session)
          })
          supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log("session en onAuthStateChange: ",session)
          })
    }, [])
    return (
    session !== null ? <SafeAreaView>
                        <Text>Ya has iniciado sesión</Text>
                        <LinkButton text={'volver al inicio gay'} handleNavigate={()=>router.navigate('/')}/>
                        </SafeAreaView> : <LogInForm/>
    )
}