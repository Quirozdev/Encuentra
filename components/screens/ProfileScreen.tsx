import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../src/supabase";
import { AuthContext } from "../../src/providers/AuthProvider";
import { useRouter } from "expo-router";
import MyEventsIcon from "../../assets/images/profile_screen/my_events_icon.svg";
import MyActivityIcon from "../../assets/images/profile_screen/my_activity_icon.svg";
import NotificationIcon from "../../assets/images/profile_screen/notification_icon.svg";
import LogOutIcon from "../../assets/images/profile_screen/logout_icon.svg";
import LoginIcon from "../../assets/images/profile_screen/login_icon.svg";
import ProfileScreenButton from "../common/ProfileScreenButton/ProfileScreenButton";
import { useSelector } from "react-redux";
import { RootState } from "../../src/app/store";

const ProfileScreen = () => {
  const { session } = useContext(AuthContext);
  const { notificacionesPendientesDeVer } = useSelector(
    (state: RootState) => state.notifications
  );
  const router = useRouter();

  function logOut() {
    supabase.auth.signOut();
  }

  return (
    <SafeAreaView style={styles.container}>
      {session ? (
        <>
          <ProfileScreenButton
            text="Mis eventos"
            icon={MyEventsIcon}
            onPress={() => {}}
          />
          <ProfileScreenButton
            text="Mi actividad"
            icon={MyActivityIcon}
            onPress={() => {}}
          />
          <ProfileScreenButton
            text="Notificaciones"
            icon={NotificationIcon}
            onPress={() => {
              router.push("/notifications");
            }}
            displayNotificationCircle={notificacionesPendientesDeVer}
          />
          <ProfileScreenButton
            text="Cerrar sesión"
            icon={LogOutIcon}
            onPress={() => {
              logOut();
            }}
          />
        </>
      ) : (
        <ProfileScreenButton
          text="Iniciar sesión"
          icon={LoginIcon}
          onPress={() => {
            router.push("/users/login");
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
