import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        justifyContent: "center",
        width:300,
        height:55,
        alignItems: "center",
        backgroundColor:COLORS.darkOrange,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.2,
shadowRadius: 4,

elevation: 10,
    },
    text: {
        color: "white",
        fontSize: 18,
        fontFamily: "Rubik-SemiBold",
    }
})

export default styles;