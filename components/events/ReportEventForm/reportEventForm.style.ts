import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,

  },
  itemView:{
    borderBottomWidth: 1,
    borderBottomColor: "#B0B1BC",
    flexDirection: "row",
    paddingBottom: 20,
    marginBottom: 15,
    marginHorizontal: 35,
    paddingLeft: 30,

  },
  itemTextContainer:{
    marginRight: 5,
    width: 234,
  },
  itemTitle:{
    fontFamily: FONTS.RubikRegular,
    fontSize: 15,
    color: "#161617",
    marginBottom: 10,
  },
  itemDescription:{
    fontFamily: FONTS.RubikRegular,
    fontSize: 12,
    color: "#8391A1",
    textAlign: "left"
  },
  checkbox: {
    position: "relative",
    bottom: 16,
  },
  checkboxError:{
    borderColor: COLORS.red,
    borderWidth: 1,
  },
  anotherReasonTextInput:{
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: "95%",
    height: 50,
  },
  anotherReasonTextInputError:{
    borderColor: COLORS.red,
    borderWidth: 1,
  },
  sendButton:{
    width: 120,
    alignSelf: "center",
    marginTop: 10,
    elevation: 4,
    marginBottom: 10,
  },
  cancelButton:{
    backgroundColor: 'transparent',
    marginBottom: 20,
    width: 120,
    alignSelf: "center",

  }
  ,cancelButtonText:{
    color: '#979797',
    fontFamily: FONTS.RubikMedium,
  }
});


export default styles;
