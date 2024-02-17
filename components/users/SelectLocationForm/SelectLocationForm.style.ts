import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.white
    },
      scrollView: {
        flex:1
     },
     titleContainer: {
        paddingTop:130,
        paddingHorizontal:50,
        paddingBottom:15,
        alignItems: "center",
        justifyContent: "center",
    }, 
    title: {
        color: COLORS.darkBlue,
        fontSize: SIZES.xLarge,
        fontFamily: FONTS.RubikBold,
        textAlign: "center"
    },
    text: {
        color: COLORS.grey,
        fontFamily: FONTS.RubikRegular,
        textAlign: "center",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        padding:20
    },
    selectEstado: {
        paddingVertical: 10,
        paddingHorizontal: 10,

    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    }
});

export default styles