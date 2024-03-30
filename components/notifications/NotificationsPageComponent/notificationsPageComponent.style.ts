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
  noAvailableNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noAvailableNotificationsText: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 18,
    color: "#706E8F",
    textAlign: "center",
  },
  noPreferencesSelectedBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
  noPreferencesSelectedBtnText: {
    fontFamily: FONTS.RubikMedium,
    fontSize: 14,
    color: COLORS.grey,
  },
});

export default styles;
