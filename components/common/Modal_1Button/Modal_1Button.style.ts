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
    }
    
});

export default styles;
