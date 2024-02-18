import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  text: {
    color:COLORS.dark,
    fontSize: 10,
  },
  category: {
    height:80,
    borderRadius: 20,
    gap:8,
    
    paddingVertical:20,
    paddingHorizontal:5,
    alignItems:'center',
    justifyContent: 'center',
  },
  selectedCategory:{
    borderWidth: 2,
    borderColor:COLORS.dark
  },
  categoryContainer:{
    alignItems:'center',
    justifyContent: 'center',
  },
  container:{
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:5,
    marginTop:10,
  }
});

export default styles;
