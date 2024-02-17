import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState, useCallback, useContext } from "react";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Audio } from "expo-av";
import { Session } from "@supabase/supabase-js";
import LinkButton from "../../components/common/LinkButton/linkButton";
import MyCarousel from "../../components/screens/WelcomeScreen";
import React from "react";
import BottomTabNavigator from "../../components/common/Navigation/BottomTabNavigator/BottomTabNavigator";
import { PortalProvider } from "@gorhom/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EventsProvider } from "../providers/EventsProvider";
import * as Location from "expo-location";
import {
  LocationContext,
  LocationProvider,
} from "../providers/LocationProvider";
import { getUserLocation } from "../services/users";
import { AuthContext, AuthProvider } from "../providers/AuthProvider";
import EventsPage from "./events";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { session } = useContext(AuthContext);
  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
  });

  /* musica por si quieren
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

  */
  //   useEffect(() => {
  //     supabase.auth.getSession().then(({ data: { session } }) => {
  //         console.log("ola session en getSession: ",session)
  //       })
  // }, [])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PortalProvider>
      {session != null ? (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <EventsPage />
        </View>
      ) : (
        <ScrollView onLayout={onLayoutRootView}>
          <MyCarousel />
        </ScrollView>
      )}
    </PortalProvider>
  );
}
