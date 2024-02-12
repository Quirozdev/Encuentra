import Carousel, {Pagination} from "react-native-snap-carousel";
import { View, Dimensions, Image, StyleSheet, Text} from "react-native";
import React, { useState, useRef } from "react";
import { Link, router } from "expo-router";
import { LinkButton, LinkButton2 } from "./linkButton";

export const SLIDER_HEIGHT = Dimensions.get("screen").height * 0.5;
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT);

const MyCarousel = () => {
    const data = [
        {image: require("../../assets/images/welcome1.png"), 
        backgroundColor: '#FFB77B'},
        {image: require("../../assets/images/welcome2.png"),
        backgroundColor: '#71CFB7'},
        {image: require("../../assets/images/welcome3.png"),
        backgroundColor: '#9D9DFD'},
    ];

    const [backgroundColor, setBackgroundColor] = useState(data[0].backgroundColor);
    const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);
    
    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.image}/>
            </View>
        );
    }

    const handleSnapToItem = (index) => {
        setBackgroundColor(data[index].backgroundColor);
    }

    return (
        <View style={[styles.container,{backgroundColor}]}>
            <Carousel
                data={data}
                renderItem={renderItem}
                autoplay={true}
                loop={true}
                sliderWidth={SLIDER_HEIGHT}
                itemWidth={ITEM_HEIGHT}
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
                <Text style={styles.title}>Bienvenido a Encuentra!</Text>
                <Text style={styles.description}>Tu portal para descubrir eventos emocionantes.¡Explora, participa y disfruta!</Text>
                <Link href="/users/register" style={styles.link}>
                    <LinkButton text="Registrarse" handleNavigate={() => router.push("/users/register")}/>
                </Link>
                <Link href="/users/login" style={styles.link}>
                    <LinkButton2 text="Iniciar sesión" handleNavigate={() => router.push("/users/login")}/>
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
    },
    container2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 30,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height * 0.5,
    },
    slide: {
        width: 300,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    image: {
        resizeMode: "contain",
        height: ITEM_HEIGHT,
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

export default MyCarousel;