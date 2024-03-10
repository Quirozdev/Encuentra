import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../../constants/theme";

const styles = StyleSheet.create({
    // styles para el componente cuando si hay eventos
    container: {
        flex:1,
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: COLORS.white,
        columnGap:20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 16,
        elevation:1,
        position: 'relative',
        marginBottom:1,
        marginTop:1
    },
    infoContainer:{
    },
    dateAndTimeContainer:{
        flexDirection: 'row',
        width: 135,
        height: 15,
    },
    dateAndTime:{
        fontFamily: FONTS.RubikRegular,
        color: '#5669FF',
        fontSize: 13,
    },
    titleContainer:{
        width: 206,
        height: 36,
        marginTop: 5,
    },
    title: {
        fontFamily: FONTS.RubikRegular,
        color: '#120D26',
        fontSize: 15,
    },
    addressContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: 211,
        height: 18,
    },
    address:{
        fontFamily: FONTS.RubikRegular,
        color: '#747688',
        fontSize: 13,
    },
    imageContainer:{
    },
    image:{
        width:79,
        height:92,
    },
    selectedContainer: {
            borderWidth: 2,
            borderColor: '#8391A1',
            opacity: 1,
    },
    unselectedContainer: {
            backgroundColor: '#AAAAAA',
            opacity: 0.5,
    },

    });

export default styles;