import { Stack, router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/app/store";
import styles from "./eventCreationConfirmation.style";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/theme";
import { useEffect, useState } from "react";
import {
  PriceDetail,
  createEvent,
  getEventPayDetails,
} from "../../../src/services/events";
import LinkButton from "../../common/LinkButton/linkButton";
import Separator from "../../common/Separator/Separator";
import FullScreenLoading from "../../common/FullScreenLoading/FullScreenLoading";

interface PayDetails {
  detailsText: string;
  priceDetails: PriceDetail[];
  total: number;
}

export default function EventCreationConfirmation() {
  const eventValues = useSelector(
    (state: RootState) => state.eventCreationForm
  );

  // cambiarlo por el id del usuario que este logeado
  const userIdPrueba = "0e92145a-1df8-4d8f-96e7-a7620c87403c";

  const [payDetails, setPayDetails] = useState<PayDetails>(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [eventCreationLoading, setEventCreationLoading] = useState(false);

  useEffect(() => {
    setDetailsLoading(true);
    getEventPayDetails(
      userIdPrueba,
      new Date(
        eventValues.date.year,
        eventValues.date.month,
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
          <Text style={styles.title}>{eventValues.name}</Text>
          <View style={styles.table}>
            <View style={styles.header}>
              <Text style={[styles.priceDetailsText, { textAlign: "center" }]}>
                {payDetails.detailsText}
              </Text>
            </View>
            <Separator
              height={1}
              color={COLORS.darkPurple}
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
              color={COLORS.veryLightGrey}
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
            <Text style={styles.userInfoText}>Nombre usuario: </Text>
            <Text style={styles.userInfoText}>Correo electrónico: </Text>
          </View>
          <View style={styles.buttonContainer}>
            {eventCreationLoading ? (
              <ActivityIndicator />
            ) : (
              <LinkButton
                text={"Crear evento"}
                handleNavigate={async () => {
                  setEventCreationLoading(true);
                  const eventId = await createEvent(
                    {
                      nombre: eventValues.name,
                      descripcion: eventValues.description,
                      duracion: Number(eventValues.duration),
                      fecha: new Date(
                        eventValues.date.year,
                        eventValues.date.month,
                        eventValues.date.day
                      ).toISOString(),
                      hora: eventValues.hour,
                      nombre_estado: eventValues.state_name,
                      nombre_municipio: eventValues.city_name,
                      direccion: eventValues.direction,
                      latitud_ubicacion: eventValues.markerCoordinates.latitude,
                      longitud_ubicacion:
                        eventValues.markerCoordinates.longitude,
                    },
                    eventValues.categoryIds,
                    eventValues.image,
                    userIdPrueba
                  );
                  setEventCreationLoading(false);

                  router.replace(`/events/${eventId}`);
                }}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
