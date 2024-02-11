import { Alert, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { useFonts } from "expo-font";

import GenericButton from "../../components/common/button/generic_button";

export default function Index() {
  const [textos, setTextos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf")
  })

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      const { data, error } = await supabase.from("tabla_prueba").select("*");
      if (error) {
        Alert.alert(error.message);
      } else {
        setTextos(data);
      }
      setCargando(false);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <GenericButton text="Registrarse"/>
      <Link
        href="/events/create"
        style={{ backgroundColor: "red", padding: 12, borderRadius: 8 }}
      >
        Crear evento
      </Link>
      {cargando ? (
        <Text>Cargando...</Text>
      ) : (
        textos.map((elemento) => {
          return (
            <Text key={elemento.id}>
              {elemento.id} - {elemento.texto}
            </Text>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
