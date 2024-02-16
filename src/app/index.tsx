import { Alert, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useEffect, useState, useCallback } from "react";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { Audio } from 'expo-av';
import { Session } from '@supabase/supabase-js';



import LinkButton from "../../components/common/LinkButton/linkButton";

SplashScreen.preventAutoHideAsync()

export default function Index() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf")
  })

  useEffect(() => {
    // Cargar el archivo de música (reemplaza con tu ruta de archivo)
    const soundObject = new Audio.Sound();
    const loadAndPlayMusic = async () => {
      try {
        await soundObject.loadAsync(require('../../assets/sounds/peteeeer.mp3'));
        // Reproducir la música en bucle
        await soundObject.setIsLoopingAsync(true);
        await soundObject.playAsync();
      } catch (error) {
        console.error('Error loading or playing sound:', error);
      }
    };
    

    loadAndPlayMusic();

    // Limpieza al desmontar el componente
    return () => {
      soundObject.unloadAsync();
    };
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        console.log("ola session en getSession: ",session)
      })
}, [])

  const onLayoutRootView = useCallback(async() => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded, fontError])

  if(!fontsLoaded && !fontError) {
    return null
  };

  return (
    
    
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View>
      <LinkButton text="Log In" handleNavigate={() => router.push("/users/login")}></LinkButton>
    </View>
    <View>
    </View>
        <LinkButton text="Registrarse" handleNavigate={() => router.push("/users/register")}/>
      <Link href="/events/create" style={{ backgroundColor: "red", padding: 12, borderRadius: 8 }}>
        Crear evento
      </Link>
      <LinkButton text="LogOut" handleNavigate={() => {
        supabase.auth.signOut();
        router.push("/users/login")}
        }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
