import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex:1,
     backgroundColor: '#FFFFFF'
  },
  text: {
    fontFamily: FONTS.RubikRegular,
    fontSize: SIZES.large,
    color: "#706E8F",
    marginHorizontal: 33,
    marginTop: 9,
    marginBottom: 14
  },
  headerBackground: {
    backgroundColor: COLORS.white,
  },
  headerTitleStyle: {
    fontSize: 24,
    fontFamily: FONTS.RubikMedium,
    color: "#120D26",
    paddingHorizontal:50
  },
  footer: {
      justifyContent: "center",
      alignItems: "center",
      padding:20
  },
});

export default styles;
