import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../constants/theme";

const styles = StyleSheet.create({
    button: {
        
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width:300,
        height:55,
        
    },
    border: {
        borderColor:COLORS.darkOrange,
        borderWidth:2
    },
    text: {
        
            color: COLORS.darkOrange,
            fontSize: 18,
            fontFamily: FONTS.RubikSemiBold,
        
        
    },
    textSmall: {
        
        color: COLORS.grey,
        fontSize: 14,
        fontFamily: FONTS.RubikRegular,
        fontWeight:'100',
    
    
}
})

export default styles;