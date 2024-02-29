import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

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
    fontSize: SIZES.xLarge,
    color: COLORS.darkBlue,
    fontWeight: "700",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: COLORS.lightPurple,
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
    fontWeight: "bold",
  },
});

export default styles;
