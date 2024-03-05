import { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import MapView, { Callout, MapMarkerProps, Marker } from "react-native-maps";
import Animated from "react-native-reanimated";
import styles from "./eventsMap.style";
import { router } from "expo-router";

interface EventsMapProps {
  events: {
    id: number;
    nombre: string;
    descripcion: string;
    latitud_ubicacion: number;
    longitud_ubicacion: number;
    portada: string;
  }[];
}

export default function EventsMap({ events }: EventsMapProps) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      // list of _id's must same that has been provided to the identifier props of the Marker
      mapRef.current.fitToSuppliedMarkers(events.map(({ id }) => String(id)));
    }
  }, [events]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={{ height: 300 }}>
        {events.map((event) => {
          return (
            <Marker
              key={event.id}
              identifier={"" + event.id}
              coordinate={{
                latitude: event.latitud_ubicacion,
                longitude: event.longitud_ubicacion,
              }}
              title={event.nombre}
              description={event.descripcion}
              onPress={(event) => {
                const id = event.nativeEvent.id;
                console.log(id);
                router.navigate(`events/details/${id}`);
              }}
            >
              {/* <Callout tooltip>
                <View
                  style={{ height: 100, width: 100, backgroundColor: "green" }}
                >
                  <Image
                    source={{ uri: event.portada }}
                    resizeMode="cover"
                    style={{ width: 50, height: 50, backgroundColor: "red" }}
                  />
                  <Text>{event.portada}</Text>
                </View>
              </Callout> */}
              {/* <Image
                source={{ uri: event.portada }}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderColor: "black",
                  borderWidth: 2,
                }}
              /> */}
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}
