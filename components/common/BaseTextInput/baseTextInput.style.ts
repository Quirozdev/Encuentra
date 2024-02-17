import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

const styles = StyleSheet.create({
  input: {
    padding: 18,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: COLORS.lightGrey,
    backgroundColor:COLORS.darkWhite,
    color:COLORS.dark,
  },
});

export default styles;
