import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
  },
  container: {
    backgroundColor: COLORS.white,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 24,
    paddingRight: 24,
    gap: 13,
    paddingBottom: 36,
  },
  header: {
    fontFamily: FONTS.RubikBold,
    fontSize: SIZES.xLarge,
    color: COLORS.darkBlue,
    marginBottom: 4,
  },
  inputText: {
    fontFamily: FONTS.RubikRegular,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  disabledInputText: {
    backgroundColor: COLORS.lightGrey,
  },
  picker: {
    flex: 1,
  },
  dateInputsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  durationAndCostContainer: {
    flex: 1,
    gap: 13,
  },
  durationAndFileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  fieldErrorContainer: {
    flex: 1,
    gap: 4,
  },
  durationInputContainer: {
    flex: 1,
  },
  nextBtn: {
    backgroundColor: COLORS.darkOrange,
    padding: 17,
    marginLeft: 24,
    marginRight: 24,
    marginTop: SIZES.xxLarge,
    borderRadius: 10,
  },
  nextBtnText: {
    fontFamily: FONTS.RubikSemiBold,
    textAlign: "center",
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  errorField: {
    borderColor: COLORS.red,
  },
  errorText: {
    color: COLORS.red,
    fontFamily: FONTS.RubikRegular,
  },
  infoText: {
    color: COLORS.darkMint,
    fontFamily: FONTS.RubikRegular,
  },
  cancelBtn: {
    alignSelf: "center",
  },
  cancelBtnText: {
    fontFamily: FONTS.RubikMedium,
    fontSize: SIZES.medium,
    color: COLORS.lightDark,
    fontWeight: "500",
    padding: 8,
  },
});

export default styles;
