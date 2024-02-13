import { StyleSheet } from 'react-native';

import { COLORS, FONTS, SIZES } from "../../../constants/theme";


const styles = StyleSheet.create({
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
});

export default styles;
