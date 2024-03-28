import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontFamily: FONTS.RubikMedium,
    fontSize: SIZES.large,
    textAlign: "center",
    color: COLORS.lightDark,
  },
  categoriesContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  emojiAndTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.large,
    justifyContent: "flex-start",
    flex: 1,
  },
  checkbox: {},
  saveBtn: {
    backgroundColor: "#735AFB",
    alignSelf: "center",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  saveBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.RubikSemiBold,
    fontSize: SIZES.medium,
  },
});

export default styles;
