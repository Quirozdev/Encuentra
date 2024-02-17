import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../constants/theme";

const styles = StyleSheet.create({
    button: {
        
        borderRadius: 10,
        width: 300,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        
            color: COLORS.darkOrange,
            fontSize: 20,
            fontFamily: FONTS.RubikSemiBold,
        
        
    }
})

export default styles;