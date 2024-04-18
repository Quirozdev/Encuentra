import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: COLORS.lightGrey,
    backgroundColor:COLORS.darkWhite,
    color:COLORS.dark,

  },
  button: {
    padding: 18,
  },
  text: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.RubikRegular,
  },
});

export default styles;
