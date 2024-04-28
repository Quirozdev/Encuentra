import { StyleSheet } from 'react-native';
import { COLORS,FONTS } from '../../../constants/theme';

const styles = StyleSheet.create({
    button: {
      backgroundColor: COLORS.darkPurple,
      paddingVertical: 13,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
        fontFamily: FONTS.RubikSemiBold,
        fontSize: 16,
        color: COLORS.white,
    },
  });

  export default styles;