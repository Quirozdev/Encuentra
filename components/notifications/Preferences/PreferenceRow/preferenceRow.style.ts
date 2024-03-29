import { StyleSheet } from "react-native";
import { FONTS } from "../../../../constants/theme";

const styles = StyleSheet.create({
  preference: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  preferenceText: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 16,
  },
});

export default styles;
