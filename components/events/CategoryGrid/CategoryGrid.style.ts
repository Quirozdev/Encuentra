import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  text: {
    color:COLORS.dark,
    fontSize: 12,
  },
  category: {
    height:80,
    borderRadius: 20,
    gap:8,
    alignItems:'center',
    justifyContent: 'center',
    paddingVertical:20,
    paddingHorizontal:5,
    marginTop:10,
    marginRight:5,
  },
  container:{
    flex:1,
    flexGrow:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default styles;
