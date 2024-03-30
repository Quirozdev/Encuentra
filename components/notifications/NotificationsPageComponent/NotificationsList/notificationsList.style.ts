import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
  notificationsContainer: {
    gap: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
  },
  notificationsDateContainer: { gap: 12 },
  notificationDateText: {
    fontFamily: FONTS.RubikMedium,
    fontSize: SIZES.large,
    color: COLORS.dark,
  },
  markAllAsReadContainer: {
    alignItems: "center",
  },
  markAllAsReadText: {
    fontFamily: FONTS.RubikMedium,
    fontSize: 14,
    color: "#000000",
  },
});

export default styles;
