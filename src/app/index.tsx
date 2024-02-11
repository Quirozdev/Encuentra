import { Alert, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function Index() {
  const [textos, setTextos] = useState([]);
  const [cargando, setCargando] = useState(false);

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
