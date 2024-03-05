import {StyleSheet} from 'react-native';
import {COLORS,FONTS, SIZES} from '../../../constants/theme';

const styles = StyleSheet.create({
    parentContainer:{
        flex:1,
        backgroundColor: 'white',
    },
    calendarContainer:{
        marginHorizontal: 20,
    },
    separator:{
        borderBottomWidth: .5,
        borderBottomColor: '#8391A1',
        marginHorizontal: 30,
        marginVertical: 20,
    },
    separator2:{
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        borderStyle: 'dashed',
        marginHorizontal: 30,
        marginVertical: 20,

    },
    
    rangoFechaContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        columnGap: 10,
        justifyContent: 'center',
    },
    rangoHoraContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        columnGap: 10,
        justifyContent: 'center',
    },
    dateTimeButtonsLabel: {
        fontFamily:FONTS.RubikRegular,
        fontSize: 10,
        position: 'absolute',
        top: -7,
        left: 10,
        paddingHorizontal: 5,
        fontWeight: 'bold',
        zIndex: 1,
        backgroundColor: 'white',
    },
    timePicker: {
        height:45,
        width: 131,
        borderWidth: 1,
        borderColor: '#414141',
        borderRadius: 30,
        backgroundColor: 'white',
    },
    dateButton: {
        fontFamily: FONTS.RubikRegular,
        fontSize:SIZES.medium,
        height:45,
        width: 131,
        borderWidth: 1,
        borderColor: '#242424',
        borderRadius: 30,
        backgroundColor: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',   
    },
    infoAnticipacion: {
        fontFamily:FONTS.RubikRegular,
        fontSize: 15,
        color:'#979797',
        textAlign: 'left',
        marginTop: 10,
        marginHorizontal: 35,
        paddingRight: 27,
    },
    rangosDiasContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:35
    },
    rangosText: {
        fontFamily: FONTS.RubikRegular,
        fontSize: 15,
        color: "#979797"
    }
    });

export default styles;