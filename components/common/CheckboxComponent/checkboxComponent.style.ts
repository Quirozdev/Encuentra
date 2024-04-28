import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      checkbox: {
        width: 18,
        height: 18,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      },
      checkboxChecked: {
        backgroundColor: '#007AFF',
      },
      checkboxUnchecked: {
        backgroundColor: '#fff',
      },
      checkboxButton:{
        width:50,
        height:50,
        borderRadius:25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkboxError:{
        borderColor: COLORS.red,
        borderWidth: 1,
      }

    });
    

export default styles;