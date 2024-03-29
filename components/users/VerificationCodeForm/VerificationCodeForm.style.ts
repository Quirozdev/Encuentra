import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    title: {
        color: COLORS.darkBlue,
        fontSize: SIZES.xLarge,
        fontFamily: FONTS.RubikBold,
    },
    titleContainer: {
        paddingTop:130,
        paddingHorizontal:15,
        paddingBottom:15,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: COLORS.grey,
        fontFamily: FONTS.RubikRegular,
        textAlign: "center",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        padding:20
    },
    container: {
        flex:1,
        backgroundColor: COLORS.white
    },
    scrollView: {
       flex:1
    },
    codeFieldRoot: {
        marginTop: 20,
        padding: 30
    },
    cell: {
        width: 45,
        height: 40,
        lineHeight: 47,
        fontSize: 24,
        borderWidth: 2,
        borderColor: COLORS.grey,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 8,
        fontFamily: FONTS.RubikRegular,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    badText: {
        color: COLORS.red,
        fontFamily: FONTS.RubikRegular,
        fontSize: SIZES.small,
        textAlign: "center",
    },    
})

export default styles;