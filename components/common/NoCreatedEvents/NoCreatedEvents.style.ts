import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../../constants/theme";

const styles = StyleSheet.create({
  emptyContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: "center",   
  },
  emptyText: {
    color: "#8391A1",
    fontFamily: FONTS.RubikMedium,
    fontSize: SIZES.medium,
    textAlign:'center'

  },
  cancelText: {
      color: "#414141",
      fontFamily: FONTS.RubikMedium,
      fontSize: SIZES.medium
  },
  textContainer: {
    marginHorizontal: 70
  },
  buttonsContainer: {
    margin: 40,
    alignItems: 'center',
    justifyContent: "center",  
    
  }
});

export default styles;
