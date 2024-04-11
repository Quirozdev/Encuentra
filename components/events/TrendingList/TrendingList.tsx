import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ImageSourcePropType,
  ImageResizeMode,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from "react-native";
import {
  convertTimeTo12HourFormat,
  formatDate,
  sumDaysToDate,
} from "../../../src/lib/dates";
import styles from "./TrendingList.style";
import {
  getAllEvents,
  getAllEventsWithCategories,
} from "../../../src/services/events";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { Event } from "../../../src/types/events.types";
import { supabase } from "../../../src/supabase";
import MapPin from "../../../assets/images/map_pin.svg";
import ProfileIcon from "../../../assets/images/navigation/profile.svg";
import { EventsContext } from "../../../src/providers/EventsProvider";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { useRouter } from "expo-router";

export default function TrendingList() {
  const { events, loading } = useContext(EventsContext);
  const router = useRouter();
  const [trendingEvents, setTrendingEvents] = useState([]);

  useEffect(() => {
    async function fetchTrendingEvents() {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

      const { data: reacciones, error } = await supabase
        .from("reacciones")
        .select("id_evento")
        .eq("tipo_reaccion", "Me gusta")
        .gte("updated_at", twentyFourHoursAgo.toISOString());

      if (error) {
        console.error("Error fetching reacciones:", error.message);
        return;
      }

      const eventosConReacciones = events.filter(
        (event) =>
          reacciones.filter((reaccion) => reaccion.id_evento === event.id)
            .length >= 50
      );

      setTrendingEvents(eventosConReacciones);
    }

    fetchTrendingEvents();
  }, [events]);

  return (
    <View style={styles.container}>
      {trendingEvents.length != 0 ? (
        trendingEvents.map((event, index) => (
          <Animated.View key={index} style={styles.card} entering={ZoomIn}>
            <TouchableHighlight
              style={styles.card}
              onPress={() => router.navigate(`events/details/${event.id}`)}
            >
              <ImageBackground
                style={{ flex: 1 }}
                imageStyle={{ borderRadius: 10 }}
                // VOLVER A PONER IMAGEN
                // source={{ uri: event.portada }}
                resizeMode="cover"
              >
                <View style={styles.content}>
                  <View style={styles.headerInfo}>
                    <View>
                      <Text style={styles.subtitleText}>
                        {formatDate(event.fecha)}
                      </Text>
                      <Text style={styles.subtitleText}>
                        {convertTimeTo12HourFormat(event.hora)}
                      </Text>
                    </View>
                    <View style={styles.assistants}>
                      <ProfileIcon
                        width={24}
                        height={24}
                        style={{ color: "white" }}
                      />
                      <Text style={styles.subtitleText}>
                        {event.cantidad_asistentes}
                      </Text>
                    </View>
                  </View>
                  <View style={{ gap: 5 }}>
                    <Text style={styles.titleText}>{event.nombre}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingRight: 15,
                      }}
                    >
                      <MapPin />
                      <Text style={styles.subtitleText}>{event.direccion}</Text>
                    </View>
                    <View
                      style={{
                        alignSelf: "flex-end",
                        flexDirection: "row",
                        gap: 4,
                      }}
                    >
                      {event.categorias.map((categoria, index) => {
                        if (categoria != null) {
                          return (
                            <View
                              key={index}
                              style={{
                                backgroundColor: categoria.color,
                                paddingHorizontal: 3,
                                paddingVertical: 4,
                                borderRadius: 100,
                              }}
                            >
                              <Text>{categoria.emoji}</Text>
                            </View>
                          );
                        }
                      })}
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableHighlight>
          </Animated.View>
        ))
      ) : (
        <View style={{ paddingTop: 100 }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontFamily: FONTS.RubikSemiBold,
                color: COLORS.grey,
                fontSize: SIZES.medium,
              }}
            >
              No se encontraron eventos trending en estos momentos
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
