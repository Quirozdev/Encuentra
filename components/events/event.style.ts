import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 24,
    paddingRight: 24,
    gap: SIZES.large,
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
  ubicationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailsText: {
    fontSize: SIZES.medium,
    color: COLORS.semiGrey,
  },
  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZES.large,
    flexWrap: "wrap",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    padding: SIZES.small,
    borderRadius: SIZES.small,
    justifyContent: "center",
  },
  categoryText: {
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  btn: {
    backgroundColor: COLORS.purple,
    padding: 17,
    marginLeft: 24,
    marginRight: 24,
    marginTop: SIZES.xxLarge,
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
});

export default styles;
