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
        width:343,
        height:300,
        borderRadius:20,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        fontFamily: FONTS.RubikRegular,
        fontSize: 16,
        paddingTop:17,
        textAlign: 'center',
        marginHorizontal: 35
    },
    modalText2: {
        fontFamily: FONTS.RubikMedium,
        fontSize: 16,
        paddingBottom:40,
        textAlign: 'center',
        color: "#FF7208",
        marginHorizontal: 30
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
    buttonsContainer: {
        flexDirection: 'row',
    }
    
});

export default styles;
