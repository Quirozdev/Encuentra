import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import SelectLocation from "./users/selectLocation";
import SelectLocationForm from "../../components/users/SelectLocationForm/SelectLocationForm";
import { useDispatch } from "react-redux";
import {
  fetchNotifications,
  notificationAdded,
  resetState,
} from "../slices/notificationsSlice";
import { AppDispatch } from "./store";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const { session } = useContext(AuthContext);
  const { location } = useContext(LocationContext);
  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.user?.id == null) {
      supabase.removeAllChannels();
      dispatch(resetState());
      return;
    }

    dispatch(fetchNotifications(session.user.id));

    const channel = supabase
      .channel("notificaciones_channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notificaciones",
          filter: `id_usuario_a_notificar=eq.${session.user.id}`,
        },
        (payload) => {
          dispatch(notificationAdded(payload.new));
        }
      )
      .subscribe();

    return () => {
      supabase.removeAllChannels();
      dispatch(resetState());
    };
  }, [session?.user?.id]);

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
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {session != null ? (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          {location.estado == null && location.municipio == null ? (
            <ActivityIndicator style={{ flex: 1 }} />
          ) : location.estado != "" && location.municipio != "" ? (
            <EventsPage />
          ) : (
            <SelectLocationForm goBack={false} />
          )}
        </View>
      ) : (
        <ScrollView onLayout={onLayoutRootView}>
          <MyCarousel />
        </ScrollView>
      )}
    </>
  );
}
