import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    userInfoContainer: {
      paddingVertical:15,
      paddingHorizontal:15,
    },
    badText: {
      fontFamily: FONTS.RubikRegular,
      fontSize: SIZES.small,
      paddingHorizontal: 20,
      color: COLORS.red,
      margin: 1
    },
    goodText: {
      fontFamily: FONTS.RubikRegular,
      fontSize: SIZES.small,
      paddingHorizontal: 20,
      color: COLORS.white,
      margin: 1
    },
    input: {
      marginVertical:1,
      fontFamily: FONTS.RubikRegular,
      backgroundColor:'#FFFFFF',
      },
    badInput: {
      marginVertical:1,
      fontFamily: FONTS.RubikRegular,
      backgroundColor:'#FFFFFF',
      borderColor: COLORS.red
    },
    cancelText:{
      fontFamily:FONTS.RubikMedium,
      fontSize: SIZES.medium,
      color:"#8391A1",
      textAlign:"center",
      marginBottom:30
  },
  btn: {
    backgroundColor: '#FF7208',
    paddingVertical: 12,
    paddingHorizontal:50,
    borderRadius: 10,
    alignSelf:'center',
    width:221,
    height:45,
    marginVertical:18

  },
  shadow:{
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 1
    }
  },
  btnText: {
    textAlign: "center",
    color: COLORS.white,
    fontFamily:FONTS.RubikSemiBold,
    fontSize: 15,
  },
  label: {
    fontFamily: FONTS.RubikMedium,
    fontSize: 16,
    color: "#404040",
    marginHorizontal: 1
  },
  emailInput:{
    backgroundColor:"#E9E9E9",
    color:"#AC9F9F"
  },
  inputContainer:{
    marginBottom:20
  }
}
);

export default styles;