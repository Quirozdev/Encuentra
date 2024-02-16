import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./event.style";
import { EventFields } from "../../src/types/events.types";
import { supabase } from "../../src/supabase";
import { EventFieldsWithMainImage } from "../../src/app/events/[id]";
import { COLORS, SIZES } from "../../constants/theme";
import Separator from "../common/Separator/Separator";

interface EventComponentProps {
  event: EventFieldsWithMainImage;
}

export default function EventComponent({ event }: EventComponentProps) {
  const url = supabase.storage
    .from("imagenes_eventos")
    .getPublicUrl(`${event.id}/${event.portada}`);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>¡Tu evento está publicado!</Text>
        <Image
          source={{ uri: url.data.publicUrl }}
          width={300}
          height={300}
          resizeMode="cover"
          style={styles.eventImage}
        />
        <Text style={styles.eventName}>{event.nombre}</Text>
        <Separator height={2} color={COLORS.darkOrange} />
        <Text>{event.fecha}</Text>
        <Text>{event.hora}</Text>
        <Text>{event.direccion}</Text>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
}
