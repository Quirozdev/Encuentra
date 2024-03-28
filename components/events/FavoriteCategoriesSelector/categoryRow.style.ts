import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  emojiContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  emoji: {
    fontSize: 24,
  },
  text: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 15,
    color: COLORS.grey,
  },
});

export default styles;
