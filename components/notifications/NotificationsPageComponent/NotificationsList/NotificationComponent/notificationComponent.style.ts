import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 18,
    borderRadius: 8,
    padding: 12,
  },
  imgContainer: {
    borderRadius: 75,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationTypeIconContainer: {
    position: "absolute",
    top: "65%",
    left: "65%",
  },
  infoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  notificationText: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 14,
    color: "#120D26",
  },
  moreInfoText: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 14,
    color: '#5669FF'
  },
  notificationHour: {
    fontFamily: FONTS.RubikMedium,
    fontSize: 14,
    color: "#5669FF",
  },
});

export default styles;
