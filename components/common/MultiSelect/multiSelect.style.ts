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
    backgroundColor:COLORS.darkWhite,
    padding: SIZES.xLarge,
    paddingLeft: SIZES.medium,
    color:COLORS.dark,

  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.grey,
  },
  selectedTextStyle: {
    color:COLORS.dark,
    fontSize: 11,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    flexDirection:'row',
    gap:8,
    alignItems:'center',
    paddingVertical:8,
    paddingHorizontal:5,
    marginTop:10,
    marginRight:5,
  },
});

export default styles;
