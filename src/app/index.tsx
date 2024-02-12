import { Alert, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState, useCallback } from "react";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import LinkButton from "../../components/common/LinkButton/linkButton";

SplashScreen.preventAutoHideAsync()

export default function Index() {
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

  const router = useRouter();
  const [textos, setTextos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf")
  })

  const onLayoutRootView = useCallback(async() => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded, fontError])

  if(!fontsLoaded && !fontError) {
    return null
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.title}>Bienvenido a Encuentra!</Text>
      <Link href="/users/register">
        <LinkButton text="Registrarse" handleNavigate={() => router.push("/users/register")}/>
      </Link>
      <Link href="/users/login">
        <LinkButton 
        text="Iniciar sesión" 
        handleNavigate={() => router.push("/users/login")}
        />
      </Link>
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
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  title: {
    fontFamily: "Rubik-Bold",
    fontSize: 36,
    color: "#000",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    marginTop: 12,
  },
});
