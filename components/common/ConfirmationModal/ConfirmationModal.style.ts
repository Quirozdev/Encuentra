import { StyleSheet } from 'react-native';

import { COLORS, FONTS, SIZES } from "../../../constants/theme";


const styles = StyleSheet.create({
    modalBackground: {
        flex:1,
        backgroundColor: '#00000060',
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: COLORS.white,
        width:323,
        height:306,
        borderRadius:45,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        fontFamily: FONTS.RubikRegular,
        fontSize: 14,
        padding:20,
        textAlign: 'center',
        marginHorizontal: 40,
        marginBottom: 10
    },
    buttonContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    contentContainer: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    cancelText:{
        fontFamily:FONTS.RubikRegular,
        fontSize:SIZES.medium,
        color: "#414141"
    },
    cancelButton:{
        marginTop: 20,
    },
    confirmButton:{
        backgroundColor:"#06BB8E",
        height:51,
        width:244,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    confirmText:{
        fontFamily:FONTS.RubikRegular,
        fontSize: 15,
        color:COLORS.white
    },
    
});

export default styles;
