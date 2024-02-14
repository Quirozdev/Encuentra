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
        marginBottom: 13,
        marginTop: 20,
        },
        forgotPwdTitleText: {
        fontFamily: FONTS.RubikBold,
        fontSize: SIZES.xLarge,
        color: COLORS.darkBlue,
        textAlign: 'center',
        marginBottom: 4,
        marginTop: 216,
        marginLeft: 25,
        marginRight: 25,
        },
        information:{
        fontFamily: FONTS.RubikRegular,
        fontSize: SIZES.medium,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        },
        buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 100,
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