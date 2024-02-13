import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: 300,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6
    },
    text: {
        color: "white",
        fontSize: 20,
        fontFamily: "Rubik-SemiBold",
    },
    
});

export default styles;