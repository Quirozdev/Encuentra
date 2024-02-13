import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState, useCallback } from "react";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import MyCarousel from "../../components/screens/WelcomeScreen";
import React from "react";
import BottomTabNavigator from "../../components/common/Navigation/BottomTabNavigator/BottomTabNavigator";

SplashScreen.preventAutoHideAsync()

export default function Index() {
  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      const { data, error } = await supabase.from("tabla_prueba").select("*");
      if (error) {
        Alert.alert(error.message);
      } else {
        setTextos(data);
      }
      setCargando(false);
    }
    fetchData();
  }, []);

  const router = useRouter();
  const [authUser, setAuthUser] = useState(false);
  const [textos, setTextos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf")
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
    <>
      {authUser ? (
      <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <BottomTabNavigator />
    </View>
      ) : (
        <ScrollView onLayout={onLayoutRootView}>
      <MyCarousel />
      </ScrollView>
      )}
    </>
  );
}
