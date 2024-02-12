import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../../constants/theme"

const styles = StyleSheet.create({
    title: {
        color: COLORS.dark,
        fontSize: SIZES.xLarge,
        fontFamily: FONTS.RubikBold,
    },
    titleContainer: {
        paddingTop:30,
        paddingBottom:15,
        paddingHorizontal:15
    },
    input: {
        marginVertical:7
    },
    inputContainer:{
        paddingVertical:15,
        paddingHorizontal:15,
        justifyContent:"space-between"
    },
    text: {
        color: COLORS.grey,
        fontFamily: FONTS.RubikRegular
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer1: {
        justifyContent: "center",
        alignItems: "center",
        padding:30
    },
    textContainer2: {
        justifyContent: "center",
        alignItems: "center",
        padding:50
    }
})

export default styles;