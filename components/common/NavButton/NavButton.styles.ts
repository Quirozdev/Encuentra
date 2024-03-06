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
        backgroundColor: '#EBEBEB',
        width:271,
        height: 58,
        borderRadius: 15
    },
    text: {
        fontFamily: FONTS.RubikRegular,
        fontSize: SIZES.medium,
        letterSpacing: 1,
    },
    backButton: {
        backgroundColor: '#EBEBEB',
    },
    nextButton: {
        backgroundColor: '#06BB8E',
    },
    invalidButton: {
        backgroundColor: '#8391A1',
    },
    backText: { 
        color:'#706E8F',
    },
    nextText: {
        color:'#FFFFFF',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    iconContainer: {
        width:100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainerBack: {
        alignItems: 'flex-start'
    },
    textContainerNext: {
        alignItems: 'flex-end'
    },
    destacarContainer: {
        marginRight: 30,
        marginTop: -15
    }
    
});

export default styles;