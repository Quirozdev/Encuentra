import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  iconTextContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    backgroundColor: "#FD7E14",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: FONTS.RubikRegular,
    fontSize: SIZES.large,
    color: "#404040",
  },
  pendingEventsIndicator: {
    width: 20,
    height: 20,
    backgroundColor: "#735AFB",
    position: "absolute",
    top: -2,
    right: -2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  pendingNotificationsQuantity: {
    textAlign: "center",
    color: COLORS.white,
    fontFamily: FONTS.RubikBold,
    fontWeight: "bold",
  },
});

export default styles;
