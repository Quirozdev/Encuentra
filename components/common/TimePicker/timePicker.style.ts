import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: COLORS.lightGrey,
  },
  button: {
    padding: 18,
  },
  text: {
    fontSize: SIZES.medium,
  },
});

export default styles;
