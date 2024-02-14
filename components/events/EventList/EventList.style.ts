import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",

    backgroundColor:COLORS.white,
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    paddingVertical:5,
    gap: 13,
  },
});

export default styles;
