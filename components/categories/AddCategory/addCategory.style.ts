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
    borderBottomWidth: 1,
    borderColor: "#404040",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  emojiInputText: {
    flex: 1,
    padding: 12,
    fontFamily: FONTS.RubikRegular,
    fontSize: SIZES.large,
  },
  textInputErrorsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 14,
    color: "#FF0000",
  },
  nameError: {
    borderWidth: 1,
    borderColor: "#FF0000",
  },
  emojiInputBtn: {
    padding: 12,
  },
  emojiError: {
    borderWidth: 1,
    borderColor: "#FF0000",
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
  colorSelectorContainerError: {
    borderWidth: 1,
    borderColor: "#FF0000",
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
  previewSection: {
    gap: 16,
  },
  previewCard: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 20,
    padding: 8,
  },
  previewEmoji: {
    fontSize: 36,
  },
  previewCategoryName: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
  btnsContainer: {
    alignItems: "center",
    marginTop: 32,
    gap: 8,
  },
  addBtn: {
    backgroundColor: "#735AFB",
    borderRadius: 10,
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 16,
    paddingBottom: 16,
  },
  addText: {
    fontFamily: FONTS.RubikSemiBold,
    fontSize: 16,
    color: COLORS.white,
  },
  cancelBtn: {
    borderRadius: 10,
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 16,
    paddingBottom: 16,
  },
  cancelText: {
    fontFamily: FONTS.RubikSemiBold,
    fontSize: 15,
    color: "#8391A1",
  },
});

export default styles;
