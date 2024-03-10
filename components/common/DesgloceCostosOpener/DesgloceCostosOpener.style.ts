import { StyleSheet } from "react-native";
import { FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        paddingHorizontal: 35
    },
    iconContainer: {
        paddingTop: 6,
        marginLeft: 5
    },
    text: {
        fontFamily: FONTS.RubikMedium,
        fontSize: 15,
        color: "#414141"
    }

})

export default styles;