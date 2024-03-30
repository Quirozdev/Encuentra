import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import styles from "./notificationsPageComponent.style";
import { COLORS } from "../../../constants/theme";
import ConfigurationIcon from "../../../assets/images/notifications/configuration.svg";
import ConfigurationIcon2 from "../../../assets/images/notifications/configuration_2.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { getNotificationsPreferencesFromUser } from "../../../src/services/notifications";
import { AuthContext } from "../../../src/providers/AuthProvider";
import useNotificationPreferences from "../../../src/hooks/useNotificationPreferences";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/app/store";
import NotificationsList from "./NotificationsList/NotificationsList";

export default function NotificationsPageComponent() {
  const router = useRouter();
  const { preferences, fetchPreferences } = useNotificationPreferences();
  const {
    notificaciones,
    notificacionesPendientesDeVer,
    loading: notificationsLoading,
  } = useSelector((state: RootState) => state.notifications);

  // todo esto es para que se vuelvan a cargar las preferencias en esta pagina
  // porque cuando se presiona el boton de volver,
  // el estado se mantiene y no se cambian las preferencias,
  // si se han cambiado en la pagina de configuracion
  useFocusEffect(
    React.useCallback(() => {
      fetchPreferences();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ paddingLeft: 16 }}>
          <ReturnButton />
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.headerText}>Notificaciones</Text>
        </View>
        <TouchableOpacity
          style={{ paddingRight: 16 }}
          onPress={() => {
            router.push("/notifications/preferences");
          }}
        >
          <ConfigurationIcon />
        </TouchableOpacity>
      </View>
      {preferences == null || notificationsLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <>
          {preferences.reaccion === false &&
          preferences.comentario === false &&
          preferences.evento_interes === false ? (
            <View style={styles.noAvailableNotificationsContainer}>
              <Text style={styles.noAvailableNotificationsText}>
                ¡Activa las notificaciones para recibir actualizaciones!
              </Text>
              <TouchableOpacity
                style={styles.noPreferencesSelectedBtn}
                onPress={() => {
                  router.push("/notifications/preferences");
                }}
              >
                <ConfigurationIcon2 />
                <Text style={styles.noPreferencesSelectedBtnText}>
                  Ir a la configuración de notificaciones
                </Text>
              </TouchableOpacity>
            </View>
          ) : notificaciones.length === 0 ? (
            <View style={styles.noAvailableNotificationsContainer}>
              <Text style={styles.noAvailableNotificationsText}>
                No hay notificaciones para mostrar
              </Text>
            </View>
          ) : (
            <NotificationsList notificaciones={notificaciones} />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
