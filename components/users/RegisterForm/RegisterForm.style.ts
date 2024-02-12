import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS } from "../../../constants/theme"

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    title: {
        color: COLORS.darkBlue,
        fontSize: SIZES.xLarge,
        fontFamily: FONTS.RubikBold,
    },
    titleContainer: {
        paddingTop:20,
        paddingBottom:15,
        paddingHorizontal:15
    },
    input: {

        marginVertical:1,
        fontFamily: FONTS.RubikRegular,
        backgroundColor:'#F7F8F9',
    },
    badInput: {
        marginVertical:1,
        fontFamily: FONTS.RubikRegular,
        backgroundColor:'#F7F8F9',
        borderColor: COLORS.red
    },
    inputContainer:{

        paddingVertical:15,
        paddingHorizontal:15,
    },
    text: {
        color: COLORS.grey,
        fontFamily: FONTS.RubikRegular
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding:30
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
    badText: {
        fontFamily: FONTS.RubikRegular,
        fontSize: SIZES.small,
        paddingHorizontal: 20,
        color: COLORS.red,
        margin: 1
    },
    goodText: {
        fontFamily: FONTS.RubikRegular,
        fontSize: SIZES.small,
        paddingHorizontal: 20,
        color: COLORS.white,
        margin: 1
    },
    modalBackground: {
        flex:1,
        backgroundColor: '#00000060',
        padding:60,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: COLORS.white,
        width:344,
        height:307,
        borderRadius:20,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        fontFamily: FONTS.RubikMedium,
        fontSize: SIZES.large,
        padding:17,
        textAlign: 'center'
    }
})

export default styles;