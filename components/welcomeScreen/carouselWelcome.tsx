import Carousel, {Pagination} from "react-native-snap-carousel";
import { View, Dimensions, Image, StyleSheet} from "react-native";
import React, { useState, useRef } from "react";

export const SLIDER_HEIGHT = Dimensions.get("screen").height * 0.45;
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    }
});

export default MyCarousel;