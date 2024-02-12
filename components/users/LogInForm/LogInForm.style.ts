import { StyleSheet } from "react-native";
import { COLORS,SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: COLORS.white,
        },
        text: {
        fontSize: SIZES.xLarge,
        fontWeight: '700',
        color: COLORS.darkBlue,
        },
        baseInput: {
        width: 300,
        height: 56,
        }
});

export default styles;