import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.white,
        paddingVertical:10,
        gap:8,
    paddingHorizontal:20,
    },
      scrollView: {
        flex:1
     },
     titleContainer: {
        justifyContent: "center",
        alignItems: 'baseline',
        
    }, 
    title: {
        color: COLORS.darkBlue,
        fontSize: SIZES.large,
        fontFamily: FONTS.RubikBold,
    },
    text: {
        color: COLORS.grey,
        fontFamily: FONTS.RubikRegular,
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "baseline",
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
    },
    select: {

    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        borderRadius: 10,
        backgroundColor: COLORS.purple,
        width:'100%',
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontSize: 18,
        fontFamily: FONTS.RubikMedium,
    },
    location:{
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginVertical:10,
        padding:5,
        gap:8,
        paddingHorizontal:15,
        borderColor:COLORS.grey,
        
    }
});

export default styles