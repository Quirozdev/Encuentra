import { StyleSheet } from "react-native";
import { COLORS,FONTS,SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: COLORS.white,
                },
                subContainer: {
                rowGap: 15,
                marginHorizontal: 25
                },
                welcomeText: { 
                fontSize: SIZES.xLarge,
                fontFamily: FONTS.RubikBold,
                color: COLORS.darkBlue,
                marginTop: 25,
                marginHorizontal: 25,
                marginBottom: 35
                },
                baseInput: {
                },
                forgotPwdText: {
                fontFamily: FONTS.RubikRegular,
                fontSize: SIZES.small,
                color: COLORS.grey,
                textAlign: 'right',
                marginRight: 25,
                marginTop: 15,
                marginBottom: 35
                },
                buttonContainer: {
                width: '100%',
                alignItems: 'center'
                },
                noAccountText: {
                fontSize: SIZES.medium,
                color: COLORS.grey,
                position: 'absolute',
                bottom: 32,
                alignSelf: 'center',
                }
});

export default styles;