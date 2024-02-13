import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: COLORS.lightGrey,
    height: 120,
    width: 120,
  },
  button: {
    padding: 8,
    height: "100%",
    width: "100%",
  },
});

export default styles;
