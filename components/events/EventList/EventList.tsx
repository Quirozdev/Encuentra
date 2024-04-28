import { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { convertTimeTo12HourFormat, formatDate } from "../../../src/lib/dates";
import styles from "./EventList.style";
import Animated, { ZoomIn } from "react-native-reanimated";
import MapPin from "../../../assets/images/map_pin.svg";
import ProfileIcon from "../../../assets/images/navigation/profile.svg";
import { EventsContext } from "../../../src/providers/EventsProvider";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { AuthContext } from "../../../src/providers/AuthProvider";

export default function EventList() {
  const { events, loading } = useContext(EventsContext);

  const router = useRouter();
  return (
    <View style={styles.container}>
      {events.length != 0 ? (
        events
          .filter((event) => event.estatus === "disponible")
          .map((event, index) => (
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
                  source={require("../../../assets/images/event_details/maxresdefault.png")}
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
                        <Text
                          style={[styles.subtitleText, styles.assistantsCount]}
                        >
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
                        <Text style={styles.subtitleText}>
                          {event.direccion}
                        </Text>
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
