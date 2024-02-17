import Carousel, { Pagination } from "react-native-snap-carousel";
import { View, Dimensions, Image, StyleSheet, Text } from "react-native";
import React, { useState, useRef } from "react";
import { Link, router } from "expo-router";
import LinkButton from "../common/LinkButton/linkButton";
import { COLORS, FONTS } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import LinkButtonOutline from "../common/LinkButtonOutline/linkButtonOutline";

export const SLIDER_HEIGHT = Dimensions.get("screen").height * 0.3;
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT);

const MyCarousel = () => {
  const data = [
    {
      image: require("../../assets/images/welcome/1.png"),
      backgroundColor: ["#FFB77B", "#F16C09"],
    },
    {
      image: require("../../assets/images/welcome/2.png"),
      backgroundColor: ["#83D8C2", "#0CB58B"],
    },
    {
      image: require("../../assets/images/welcome/3.png"),
      backgroundColor: ["#9D9DFD", "#735AFB"],
    },
  ];

  const [backgroundColor, setBackgroundColor] = useState(
    data[0].backgroundColor
  );
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  const handleSnapToItem = (index) => {
    setBackgroundColor(data[index].backgroundColor);
  };

  return (
    <View style={[styles.container]}>
      <LinearGradient
        // Background Linear Gradient
        colors={backgroundColor}
        style={[styles.background]}
      />
      <Carousel
        data={data}
        renderItem={renderItem}
        autoplay={true}
        loop={true}
        sliderWidth={Dimensions.get("screen").width}
        itemWidth={Dimensions.get("screen").width}
        onSnapToItem={(index) => {
          setIndex(index);
          handleSnapToItem(index);
        }}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      />
      <View style={styles.container2}>
        <Text style={styles.title}>¡Bienvenido a Encuentra!</Text>
        <Text style={styles.description}>
          Tu portal para descubrir eventos emocionantes. ¡Explora, participa y
          disfruta!
        </Text>
        <Link href="/users/register" style={styles.link}>
          <LinkButton
            text="Registrarse"
            handleNavigate={() => router.push("/users/register")}
          />
        </Link>
        <Link href="/users/login" style={styles.link}>
          <LinkButtonOutline
            text="Iniciar sesión"
            handleNavigate={() => router.push("/users/login")}
          />
        </Link>
        <Link href="/events/create" style={styles.link}>
          <LinkButtonOutline
            text="Crear evento"
            handleNavigate={() => router.push("/events/create")}
          />
        </Link>
        <Link href="/events" style={styles.link}>
          <LinkButtonOutline
            text="Ver eventos"
            handleNavigate={() => router.push("/events")}
          />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("screen").height * 0.6,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopEndRadius: 30,
    gap: 10,
    borderTopLeftRadius: 30,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.52,
  },
  slide: {
    width: 300,
    marginTop: Dimensions.get("screen").height * 0.1,
    maxHeight: Dimensions.get("screen").height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    height: Dimensions.get("screen").height * 0.3,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontFamily: FONTS.RubikSemiBold,
    fontSize: 36,
    color: COLORS.dark,
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 13,
    color: COLORS.lightDark,
    marginBottom: 24,
    lineHeight: 20,
    paddingHorizontal: 50,
    textAlign: "center",
  },
  link: {
    alignSelf: "center",
  },
});

export default MyCarousel;
