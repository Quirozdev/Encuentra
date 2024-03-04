import { StyleSheet } from 'react-native';

import { COLORS, FONTS, SIZES } from "../../../constants/theme";


const styles = StyleSheet.create({
    view: {
       flex:1, 
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: "center",
    },
    container: {
        backgroundColor: '#7356FF',
        width:224,
        height: 60,
        borderRadius: 15
    },
    text: {
        fontFamily: FONTS.RubikSemiBold,
        fontSize: SIZES.large,
        color: COLORS.white
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    iconContainer: {
        width:60,
        alignItems: 'center',
        justifyContent: 'center',
        
    }
});

export default styles;