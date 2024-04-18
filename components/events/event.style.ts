import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

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
    fontFamily: FONTS.RubikBold,
    fontSize: SIZES.xLarge,
    color: COLORS.darkBlue,
    marginBottom: 4,
    textAlign: "center",
  },
  eventImage: {
    borderRadius: SIZES.medium,
    alignSelf: "center",
  },
  eventName: {
    fontFamily: FONTS.RubikSemiBold,
    fontSize: SIZES.large,
  },
  ubicationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailsText: {
    fontFamily: FONTS.RubikRegular,
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
    fontFamily: FONTS.RubikRegular,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  btn: {
    backgroundColor: '#FF7208',
    padding: 17,
    marginLeft: 24,
    marginRight: 24,
    marginTop: SIZES.xxLarge,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: FONTS.RubikSemiBold,
    textAlign: "center",
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
});

export default styles;
