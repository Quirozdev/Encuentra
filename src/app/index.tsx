import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState, useCallback } from "react";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import MyCarousel from "../../components/screens/WelcomeScreen";
import React from "react";
import BottomTabNavigator from "../../components/common/Navigation/BottomTabNavigator/BottomTabNavigator";
import { PortalProvider } from '@gorhom/portal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { EventsProvider } from "../providers/EventsProvider";
import * as Location from 'expo-location';

SplashScreen.preventAutoHideAsync()

export default function Index() {

  const router = useRouter();
  const [authUser, setAuthUser] = useState(true);
  const [textos, setTextos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf")
  })

  useEffect(()=>{
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

    })();
  })

  const onLayoutRootView = useCallback(async() => {

      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded, fontError])

  if(!fontsLoaded && !fontError) {
    return null
  };

  return (
    <EventsProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
      {authUser ? (
      <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <BottomTabNavigator />
    </View>
      ) : (
        <ScrollView onLayout={onLayoutRootView}>
      <MyCarousel />
      </ScrollView>
      )}
      </PortalProvider>
    </GestureHandlerRootView>
    </EventsProvider>
  );
}