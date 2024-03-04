import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ImageSourcePropType,
  ImageResizeMode,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  convertTimeTo12HourFormat,
  formatDate,
  sumDaysToDate,
} from "../../../src/lib/dates";
import styles from "./EventList.style";
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

export default function EventList() {
  const { events, loading } = useContext(EventsContext);

  function getImageUrl(id: number, fileName: string): string {
    const { data } = supabase.storage
      .from("imagenes_eventos")
      .getPublicUrl(`${id}/${fileName}`);

    return data.publicUrl;
  }

  return (
    <View style={styles.container}>
      {events.length != 0 ? (
        events.map((event, index) => (
          <Animated.View key={index} style={styles.card} entering={ZoomIn}>
            <ImageBackground
              style={{ flex: 1 }}
              imageStyle={{ borderRadius: 10 }}
              source={{ uri: event.portada }}
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
              No se encontraron eventos
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
