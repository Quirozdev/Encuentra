import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    padding: 18,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    backgroundColor:COLORS.darkWhite,
    borderColor: COLORS.lightGrey,
    color:COLORS.dark,

  },
  text: {
    fontSize: SIZES.medium,
  },
});

export default styles;
