import { StyleSheet } from 'react-native';

import { COLORS, FONTS, SIZES } from "../../../constants/theme";


const styles = StyleSheet.create({
    modalBackground: {
        flex:1,
        backgroundColor: '#00000060',
        justifyContent: "center",
        alignItems: "center",
    },
    modalViewUp: {
        backgroundColor: COLORS.white,
        width:331,
        height:224-63,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        justifyContent: "center",
        alignItems: "center",
    },
    modalViewDown:{
        backgroundColor: "#F1F5F8",
        width:331,
        height:63,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        fontFamily: FONTS.RubikBold,
        fontSize: 24,
        padding:17,
        textAlign: 'center',
        marginHorizontal: 15,
        marginTop: 20
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
        height:38,
        width:144,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    confirmText:{
        fontFamily:FONTS.RubikSemiBold,
        fontSize: 15,
        color:COLORS.white
    },
    iconContainer:{
        position:'absolute',
        bottom: 120
    }
    
});

export default styles;