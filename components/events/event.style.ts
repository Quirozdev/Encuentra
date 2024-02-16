import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 24,
    paddingRight: 24,
    gap: 13,
    paddingBottom: 36,
  },
  header: {
    fontSize: SIZES.xLarge,
    color: COLORS.darkBlue,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  eventImage: {
    borderRadius: SIZES.medium,
    alignSelf: "center",
  },
  eventName: {
    fontSize: SIZES.large,
    fontWeight: "600",
  },
});

export default styles;
