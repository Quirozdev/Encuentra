import {StyleSheet} from 'react-native';
import {COLORS,FONTS, SIZES} from '../../../constants/theme';

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: FONTS.RubikMedium,
        fontSize: 24,
        color: "#1E232C"
    },
    parentContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    // cosas del bloque de info de pago
    infoPagoContainer: {
        backgroundColor: '#EDEDED',
        marginHorizontal: 30,
        borderRadius: 20,
        elevation: 5,
        marginBottom:10
    },
    infoPagoTitle: {
        fontFamily: FONTS.RubikMedium,
        fontSize: SIZES.medium,
        color: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        textAlign: 'center',
        marginHorizontal: 20,
        paddingBottom: 5,
        marginTop: 20,
        marginBottom: 20
    },
    containerTituloHoras:{
        flexDirection: 'row',
        columnGap: 0,
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 35,
    },
    info:{
        flexDirection: 'column',
    },
    infoTitle: {
        color: 'black',
        fontSize: 15,
        fontFamily: FONTS.RubikRegular,
    },
    infoText: {
        color: '#979696',
        fontSize: 15,
        fontFamily: FONTS.RubikRegular,
    },
    cantidades:{
        color:'#06B187',
        fontFamily: FONTS.RubikMedium,
        fontSize: SIZES.medium,
        
    },
    descripcion:{
        color: '#979696',
        fontSize: 15,
        fontFamily: FONTS.RubikRegular,
        textAlign: 'right',
        marginRight: 35,
    },
    subTotalContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 35,
        marginTop: 15,
        marginBottom: 10,
    },
    subTotalTitle: {
        color: '#414141',
        fontSize: 15,
        fontFamily: FONTS.RubikMedium,
    },
    subTotalCantidad:{
        color:'#06B187',
        fontFamily: FONTS.RubikMedium,
        fontSize: SIZES.medium,
        textDecorationLine: 'underline',
    },
    separatorGreen:{
        borderBottomColor: '#06BB8E',
        borderBottomWidth: 1,
        marginHorizontal: 20,
    },
    separatorGreenWide2:{
        borderBottomColor: '#06BB8E',
        borderBottomWidth: 2,
        marginHorizontal: 20,
        marginBottom: 15,
    },
    totalCantidad:{
        color:'#414141',
        fontFamily: FONTS.RubikMedium,
        fontSize: SIZES.medium,
    },

    // cosas del boton
    cancelText:{
        fontFamily:FONTS.RubikMedium,
        fontSize: SIZES.medium,
        color:"#414141",
        textAlign:"center",
        marginBottom:10
    },
    nextButtonContainer:{
        alignItems:'center',
        justifyContent: 'center',
        marginVertical: 15,
    }
});

export default styles;