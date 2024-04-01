import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex:1,
     backgroundColor: '#FFFFFF'
  },
  text: {
    fontFamily: FONTS.RubikRegular,
    fontSize: SIZES.medium,
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
      marginBottom: 20
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: "center",   
  },
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
    gap: 20,
  },
  header: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  search: {
    gap: 10,
  },
  location: {
    gap: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.dark,
    fontFamily: FONTS.RubikMedium,
  },
  title: {
    fontSize: 32,
    color: COLORS.dark,
    fontFamily: FONTS.RubikMedium,
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 100,
  },
});

export default styles;
