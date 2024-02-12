import { StyleSheet } from "react-native";
import { COLORS,FONTS,SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 25
        },
        welcomeText: {
        fontSize: SIZES.xLarge,
        fontFamily: FONTS.RubikBold,
        color: COLORS.darkBlue,
        marginBottom: 40
        },
        baseInput: {
        marginBottom: 13
        },
        forgotPwdText: {
        fontFamily: FONTS.RubikRegular,
        fontSize: SIZES.small,
        color: COLORS.grey,
        textAlign: 'right',
        marginBottom: 31,
        marginTop: 15
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