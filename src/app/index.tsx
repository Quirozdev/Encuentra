import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState, useCallback } from "react";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import MyCarousel from "../../components/welcomeScreen/carouselWelcome";
import { LinkButton, LinkButton2 } from "../../components/welcomeScreen/linkButton";

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
    <ScrollView onLayout={onLayoutRootView}>
      <MyCarousel />
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a Encuentra!</Text>
        <Text style={styles.description}>Tu portal para descubrir eventos emocionantes.¡Explora, participa y disfruta!</Text>
        <Link href="/users/register" style={styles.link}>
          <LinkButton text="Registrarse" handleNavigate={() => router.push("/users/register")}/>
        </Link>
        <Link href="/users/login" style={styles.link}>
          <LinkButton2 text="Iniciar sesión" handleNavigate={() => router.push("/users/login")}/>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
  title: {
    fontFamily: "Rubik-Bold",
    fontSize: 36,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#000",
    marginBottom: 24,
    textAlign: "center",
  },
  link: {
    alignSelf: "center"
  }
});
