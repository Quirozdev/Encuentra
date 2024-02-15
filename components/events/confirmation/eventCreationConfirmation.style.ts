import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

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
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: COLORS.lightPurple,
    borderRadius: 20,
    padding: SIZES.small,
  },
  detailsTextContainer: {
    padding: SIZES.xLarge,
  },
  text: {
    fontSize: SIZES.medium,
  },
  separator: {
    height: 1,
    marginLeft: SIZES.xLarge,
    marginRight: SIZES.xLarge,
  },
  priceDetailTableBody: {
    paddingTop: SIZES.xxLarge,
    gap: 20,
  },
  priceDetailsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default styles;
