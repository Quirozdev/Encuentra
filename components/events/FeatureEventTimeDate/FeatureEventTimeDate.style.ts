import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    parentContainer:{
        flex:1,
        backgroundColor: 'white',
    },
    calendarContainer:{
        marginHorizontal: 20,
    },
    separator:{
        height: 0.5,
        backgroundColor: '#8391A1',
        marginVertical: 10,
        marginHorizontal: 35,
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
        position: 'absolute',
        top: -10,
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
        height:45,
        width: 131,
        borderWidth: 1,
        borderColor: '#414141',
        borderRadius: 30,
        backgroundColor: 'white',
        
    }
    });

export default styles;