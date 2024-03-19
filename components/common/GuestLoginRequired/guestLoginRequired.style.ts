import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SIZES.medium,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.darkBlue,
  },
  button: {
    backgroundColor: COLORS.darkOrange,
    padding: 17,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});

export default styles;
