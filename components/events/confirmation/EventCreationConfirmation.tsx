import { Stack, router } from "expo-router";

import { useSelector } from "react-redux";
import { RootState } from "../../../src/app/store";
import styles from "./eventCreationConfirmation.style";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/theme";
import { useEffect, useState } from "react";
import {
  PriceDetail,
  createEvent,
  getEventPayDetails,
} from "../../../src/services/events";
import LinkButton from "../../common/LinkButton/linkButton";

export default function EventCreationConfirmation() {
  const eventValues = useSelector(
    (state: RootState) => state.eventCreationForm
  );

  // cambiarlo por el id del usuario que este logeado
  const userIdPrueba = "0e92145a-1df8-4d8f-96e7-a7620c87403c";

  const [detailsText, setDetailsText] = useState(null);
  const [priceDetails, setPriceDetails] = useState<PriceDetail[]>(null);
  const [total, setTotal] = useState<number>(null);
  const [eventCreationLoading, setEventCreationLoading] = useState(false);

  useEffect(() => {
    console.log(eventValues.date);
    getEventPayDetails(
      userIdPrueba,
      new Date(
        eventValues.date.year,
        eventValues.date.month,
        eventValues.date.day
      )
    ).then((payDetails) => {
      setDetailsText(payDetails.detailsText);
      setPriceDetails(payDetails.priceDetails);
      setTotal(payDetails.total);
    });
  }, [eventValues]);

  if (detailsText === null || priceDetails === null || total === null) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>{eventValues.name}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsTextContainer}>
              <Text style={[styles.text, { textAlign: "center" }]}>
                {detailsText}
              </Text>
            </View>
            <View
              style={[styles.separator, { backgroundColor: COLORS.darkPurple }]}
            ></View>
            <View style={styles.priceDetailTableBody}>
              {priceDetails.map((priceDetail) => {
                return (
                  <View key={priceDetail.month} style={styles.priceDetailsRow}>
                    <Text style={styles.text}>{priceDetail.month}</Text>
                    <Text style={styles.text}>${priceDetail.price}</Text>
                  </View>
                );
              })}
              <View
                style={[styles.separator, { backgroundColor: COLORS.grey }]}
              ></View>
              <View style={styles.priceDetailsRow}>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>${total}</Text>
              </View>
            </View>
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
                      name: eventValues.name,
                      description: eventValues.description,
                      duration: Number(eventValues.duration),
                      date: new Date(
                        eventValues.date.year,
                        eventValues.date.month,
                        eventValues.date.day
                      ).toISOString(),
                      hour: eventValues.hour,
                      state_name: eventValues.state_name,
                      city_name: eventValues.city_name,
                      direction: eventValues.direction,
                      ubication_latitude:
                        eventValues.markerCoordinates.latitude,
                      ubication_longitude:
                        eventValues.markerCoordinates.longitude,
                    },
                    eventValues.categoryIds,
                    eventValues.image,
                    userIdPrueba
                  );
                  setEventCreationLoading(false);

                  console.log("id: ", eventId);

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
