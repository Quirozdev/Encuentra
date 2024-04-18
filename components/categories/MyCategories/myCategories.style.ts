import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.white,
    gap: SIZES.large,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    // paddingRight: 16,
    // paddingLeft: 16,
  },
  flexContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: FONTS.RubikMedium,
    fontSize: 24,
    textAlign: "center",
    color: COLORS.darkBlue,
  },
  title: {
    fontFamily: FONTS.RubikMedium,
    fontSize: SIZES.large,
    textAlign: "center",
    color: COLORS.lightDark,
  },
  subtitle: {
    fontFamily: FONTS.RubikRegular,
    color: '#8391A1',
    fontSize: 15,
    textAlign: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  categoriesContainer: {
    paddingLeft: 24,
    paddingRight: 24,
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
  disabledBtn: {
    opacity: 0.7
  },
  saveBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.RubikSemiBold,
    fontSize: SIZES.medium,
    paddingLeft: 12,
    paddingRight: 12,
  },
});

export default styles;