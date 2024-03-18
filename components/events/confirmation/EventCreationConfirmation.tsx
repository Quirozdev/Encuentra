import { Stack, router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/app/store";
import styles from "./eventCreationConfirmation.style";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/theme";
import { useContext, useEffect, useState } from "react";
import {
  EventPayDetails,
  createEvent,
  getEventPayDetails,
} from "../../../src/services/events";
import LinkButton from "../../common/LinkButton/linkButton";
import Separator from "../../common/Separator/Separator";
import FullScreenLoading from "../../common/FullScreenLoading/FullScreenLoading";
import { supabase } from "../../../src/supabase";
import {
  generateEventPaymentDetailsEmail,
  sendEmail,
} from "../../../src/services/email";
import { EventFields } from "../../../src/types/events.types";
import { AuthContext } from "../../../src/providers/AuthProvider";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function EventCreationConfirmation() {
  const eventValues = useSelector(
    (state: RootState) => state.eventCreationForm
  );

  const { session } = useContext(AuthContext);

  const [payDetails, setPayDetails] = useState<EventPayDetails>(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [eventCreationLoading, setEventCreationLoading] = useState(false);

  if (!session) {
    Alert.alert("Necesitas iniciar sesión");
    router.push("/users/login");
  }

  const userId = session.user.id;
  const userEmail = session.user.email;

  useEffect(() => {
    setDetailsLoading(true);
    getEventPayDetails(
      userId,
      new Date(
        eventValues.date.year,
        eventValues.date.month - 1,
        eventValues.date.day
      )
    )
      .then((payDetailsResponse) => {
        setPayDetails({
          detailsText: payDetailsResponse.detailsText,
          priceDetails: payDetailsResponse.priceDetails,
          total: payDetailsResponse.total,
        });
      })
      .finally(() => {
        setDetailsLoading(false);
      });
  }, [eventValues]);

  if (detailsLoading) {
    return <FullScreenLoading loadingText="Cargando detalles de pago..." />;
  }

  if (eventCreationLoading) {
    return <FullScreenLoading loadingText="Creando evento..." />;
  }

  return (
    <>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.container]}>
          <ReturnButton />
          <Text style={styles.title}>{eventValues.name}</Text>
          <View style={styles.table}>
            <View style={styles.header}>
              <Text style={[styles.priceDetailsText, { textAlign: "center" }]}>
                {payDetails.detailsText}
              </Text>
            </View>
            <Separator
              height={1}
              color={COLORS.darkOrange}
              style={styles.separator}
            />
            <View style={styles.priceDetailTableBody}>
              {payDetails.priceDetails.map((priceDetail) => {
                return (
                  <View key={priceDetail.month} style={styles.priceDetailsRow}>
                    <Text style={styles.priceDetailsText}>
                      {priceDetail.month}
                    </Text>
                    <Text style={styles.priceDetailsText}>
                      ${priceDetail.price}
                    </Text>
                  </View>
                );
              })}
            </View>
            <Separator
              height={1}
              color={COLORS.darkOrange}
              style={styles.separator}
            />
            <View style={styles.footer}>
              <View style={styles.priceDetailsRow}>
                <Text style={styles.priceDetailsText}>Total</Text>
                <Text style={styles.priceDetailsText}>${payDetails.total}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.userInfoText}>
              Correo electrónico: {userEmail}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            {eventCreationLoading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={styles.createEventBtn}
                onPress={async () => {
                  const event: EventFields = {
                    nombre: eventValues.name,
                    descripcion: eventValues.description,
                    duracion: Number(eventValues.duration),
                    costo: Number(eventValues.cost) || 0,
                    fecha: `${eventValues.date.year}-${eventValues.date.month}-${eventValues.date.day}`,
                    hora: eventValues.hour,
                    nombre_estado: eventValues.state_name,
                    nombre_municipio: eventValues.city_name,
                    direccion: eventValues.direction,
                    latitud_ubicacion: eventValues.markerCoordinates.latitude,
                    longitud_ubicacion: eventValues.markerCoordinates.longitude,
                    id_usuario: ""
                  };

                  setEventCreationLoading(true);
                  const eventId = await createEvent(
                    event,
                    eventValues.categoryIds,
                    eventValues.image,
                    userId
                  );

                  setEventCreationLoading(false);

                  sendEmail({
                    to: userEmail,
                    subject: `Evento creado ${event.nombre}`,
                    htmlText: generateEventPaymentDetailsEmail(
                      event,
                      payDetails
                    ),
                  });

                  router.replace(`/events/${eventId}`);
                }}
              >
                <Text style={styles.createEventTextBtn}>Crear evento</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
