import MapView, { Marker } from "react-native-maps";
import styles from "./map.style";
import { View } from "react-native";

export default function Map({ onDragEnd, markerCoordinates }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: markerCoordinates.latitude,
          longitude: markerCoordinates.longitude,
          latitudeDelta: 0.2192,
          longitudeDelta: 0.1001,
        }}
        onPress={(e) => {
          onDragEnd(e.nativeEvent.coordinate);
        }}
      >
        {markerCoordinates && (
          <Marker
            draggable
            onDragEnd={(e) => {
              onDragEnd(e.nativeEvent.coordinate);
            }}
            coordinate={markerCoordinates}
            title="Evento de prueba"
            description="este evento es para..."
          />
        )}
      </MapView>
    </View>
  );
}
