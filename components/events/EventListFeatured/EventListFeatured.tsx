import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { convertTimeTo12HourFormat, formatDate } from "../../../src/lib/dates";
import styles from "./EventListFeatured.style";
import Animated, { ZoomIn } from "react-native-reanimated";
import MapPin from "../../../assets/images/map_pin.svg";
import ProfileIcon from "../../../assets/images/navigation/profile.svg";
import { EventsContext } from "../../../src/providers/EventsProvider";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { supabase } from "../../../src/supabase";

export default function EventListFeatured() {
  const { events, loading } = useContext(EventsContext);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const router = useRouter();
  useEffect(() => {
    // console.log("Getting featured events");
    // console.log(events);
    // console.log('still getting em');
    // console.log(featuredEvents);
    getFeaturedEvents();
    //console.log('featuredEvents',featuredEvents);
  }, [events]);

  async function getFeaturedEvents() {
    const { data, error } = await supabase
      .from("destacados")
      .select("id_evento");
    if (error) {
      console.log(error);
    }
    let featuredEventsIds = new Set(data.map((event) => event.id_evento));
    setFeaturedEvents(filterFeaturedEvents(featuredEventsIds));
  }

  function filterFeaturedEvents(featuredEventsIds: Set<any>) {
    let myFeaturedEvents = events.filter((event) => {
      return featuredEventsIds.has(event.id);
    });
    return myFeaturedEvents;
  }

  return (
    <View style={styles.container}>
      {featuredEvents.length != 0 ? (
        featuredEvents.map((event, index) => (
          <Animated.View key={index} entering={ZoomIn}>
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
              No se encontraron eventos
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
