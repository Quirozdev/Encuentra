import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    gap: SIZES.medium,
    paddingBottom: 36,
  },
  title: {
    fontFamily: FONTS.RubikBold,
    fontSize: SIZES.xLarge,
    color: COLORS.darkBlue,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#DADADA',
    borderRadius: 20,
    padding: SIZES.small,
    gap: SIZES.large,
  },
  header: {
    paddingTop: SIZES.medium,
  },
  priceDetailsText: {
    fontSize: SIZES.medium,
    color: COLORS.darkBlue,
    fontFamily: FONTS.RubikRegular,
  },
  separator: {
    marginLeft: SIZES.xLarge,
    marginRight: SIZES.xLarge,
  },
  priceDetailTableBody: {
    gap: 20,
    flex: 1,
  },
  priceDetailsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footer: {
    paddingBottom: SIZES.medium,
  },
  userInfoText: {
    fontSize: SIZES.medium,
    color: COLORS.lightDark,
    fontFamily: FONTS.RubikRegular,
  },
  buttonContainer: {
    display: "flex",
  },
  createEventBtn: {
    backgroundColor: COLORS.darkOrange,
    padding: 17,
    marginLeft: 24,
    marginRight: 24,
    marginTop: SIZES.xxLarge,
    borderRadius: 10,
  },
  createEventTextBtn: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: FONTS.RubikBold,
  },
});

export default styles;
