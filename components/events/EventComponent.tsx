import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./event.style";
import { supabase } from "../../src/supabase";
import { EventFieldsViewProps } from "../../src/app/events/[id]";
import { COLORS } from "../../constants/theme";
import Separator from "../common/Separator/Separator";
import { formatStrDateToSpanish, formatStrHour } from "../../src/lib/dates";
import { router } from "expo-router";

const ubicationIcon = require("../../assets/images/ubication_icon.png");

interface EventComponentProps {
  event: EventFieldsViewProps;
}

export default function EventComponent({ event }: EventComponentProps) {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>¡Tu evento está publicado!</Text>
        <Image
          source={{ uri: event.portada }}
          width={320}
          height={320}
          resizeMode="contain"
          style={styles.eventImage}
        />
        <Text style={styles.eventName}>{event.nombre}</Text>
        <Separator height={2} color={COLORS.darkOrange} />
        <Text style={styles.detailsText}>
          {formatStrDateToSpanish(event.fecha)}
        </Text>
        <Text style={styles.detailsText}>{formatStrHour(event.hora)}</Text>
        <View style={styles.ubicationContainer}>
          <Image source={ubicationIcon} width={60} height={60} />
          <Text
            style={styles.detailsText}
          >{`${event.nombre_municipio}, ${event.nombre_estado}, ${event.direccion}`}</Text>
        </View>
        <View style={styles.categoriesContainer}>
          {event.categorias.map((category) => {
            return (
              <View
                key={category.id}
                style={[
                  styles.categoryContainer,
                  { backgroundColor: category.color },
                ]}
              >
                <Text style={styles.categoryText}>{category.emoji}</Text>
                <Text style={styles.categoryText}>{category.nombre}</Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            router.push("/");
          }}
        >
          <Text style={styles.btnText}>Inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
