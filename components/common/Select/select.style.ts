import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: COLORS.lightGrey,
    padding: SIZES.xLarge,
    paddingLeft: SIZES.medium,
  },
  onFocus: {
    borderColor: COLORS.purple,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.grey,
  },
  itemStyleTextStyle: {
    fontSize: SIZES.medium,
  },
  selectedTextStyle: {
    fontSize: SIZES.medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: SIZES.small,
  },
});

export default styles;
