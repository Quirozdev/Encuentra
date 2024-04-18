import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    gap: 16,
  },
  headerText: {
    fontFamily: FONTS.RubikMedium,
    fontSize: 24,
    flex: 1,
    flexWrap: "wrap",
    color: COLORS.darkBlue,
  },
  preferencesTitle: {
    fontFamily: FONTS.RubikMedium,
    fontSize: SIZES.large,
    color: COLORS.lightDark,
  },
  preferencesContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    gap: 8,
    paddingTop: 32
  },
  preference: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  preferenceText: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 16,
  },
  favouriteCategoriesContainer: {
    paddingLeft: 28,
    paddingTop: 18,
    paddingRight: 16,
  },
  favouriteCategoriesText: {
    color: "#404040",
  },
});

export default styles;
