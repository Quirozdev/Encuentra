import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

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
    padding: 28,
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
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
