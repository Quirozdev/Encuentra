import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",

    backgroundColor: COLORS.white,
    flex: 1,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    marginVertical: 10,
    height: 250,
    borderRadius: 10,
  },
  subtitleText: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.RubikRegular,
    fontSize: 15,
  },

  titleText: {
    color: COLORS.lightGrey,

    fontFamily: FONTS.RubikMedium,
    fontSize: 20,
  },
  content: {
    backgroundColor: "rgba(52, 52, 52, 0.6)",
    flex: 1,
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 15,
  },
  headerInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  assistants: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
});

export default styles;
