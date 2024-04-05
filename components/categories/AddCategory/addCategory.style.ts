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
    gap: 16,
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
  addCategoryForm: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  label: {
    fontFamily: FONTS.RubikRegular,
    fontSize: SIZES.large,
  },
  emojiInput: {
    borderWidth: 1,
    borderColor: "#5F5F5F",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  emojiInputText: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#5F5F5F",
    padding: 12,
    fontFamily: FONTS.RubikRegular,
    fontSize: SIZES.large,
  },
  emojiInputBtn: {
    padding: 12,
  },
  emojiModalContainer: {
    width: "100%",
    height: "110%",
    position: "absolute",
    zIndex: 10000,
  },
  emojiModal: {
    zIndex: 100000,
  },
  colorSelectorContainer: {
    gap: 16,
  },
  colors: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 80,
  },
  colorBtn: {
    width: 42,
    height: 42,
    borderRadius: 22,
  },
});

export default styles;
