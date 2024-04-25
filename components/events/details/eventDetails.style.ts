import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: SIZES.large,
    paddingBottom: 10,
  },
  btnPurple: {
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 15,
    paddingHorizontal:50,
    borderRadius: 10,
    alignSelf:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    
    elevation: 10,
  },
info:{flexDirection:'row',gap:8,alignItems:'center'},
  title: {
    fontSize: SIZES.xxLarge,
    color: "#120D26",
    fontWeight: "700",
    marginBottom: 4,
  },
  icon:{width:48,height:48,borderRadius:12,backgroundColor:'rgba(6, 187, 142, 0.1)',alignItems:'center',justifyContent:'center'},
  subtitle:{fontFamily:FONTS.RubikRegular,fontSize:12,color:'#747688'},
  header:{fontFamily:FONTS.RubikRegular,fontSize:16,lineHeight:20,color:'rgba(18, 13, 38, 1)'},
  reactions:{
    alignSelf:'center',
    flexDirection:'row',
    position:'absolute',
    top:270,
    gap:40,
    paddingHorizontal:40,
    paddingVertical:8,
    backgroundColor:'white',
    borderRadius:60,
    

  },
  reactionBtn:{justifyContent:'center',alignItems:'center'},
  reactionCount:{color:'grey',fontSize:12,fontFamily:FONTS.RubikRegular},
  heading:{color: '#120D26',fontFamily:FONTS.RubikSemiBold,fontSize:18},
  description:{color: '#747688',fontFamily:FONTS.RubikRegular,fontSize:16,lineHeight:25},
  eventImage: {
    minWidth:'100%',
    height:300,
    paddingHorizontal:20,
    alignSelf: "center",
  },
  moreText:{color: '#735AFB',fontFamily:FONTS.RubikRegular,fontSize:16,lineHeight:25},
  button: {
    width: 41,
    height: 41,
    backgroundColor: 'rgba(209, 206, 206, 0.6)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
},
input: {
  color:COLORS.dark,
  fontFamily:FONTS.RubikRegular,
  fontSize:15,
  flex:1,
},
inputContainer: {
  borderWidth: 1,
  borderColor:'#E8ECF4',
  borderRadius:8,
  backgroundColor:'#F7F8F9',
  padding: 14,
    flexDirection: "row",
    alignItems: "center",
},
  eventName: {
    fontSize: SIZES.large,
    fontWeight: "600",
  },
  ubicationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailsText: {
    fontSize: SIZES.medium,
    color: COLORS.semiGrey,
  },
  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZES.large,
    flexWrap: "wrap",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    padding: SIZES.small,
    borderRadius: SIZES.small,
    justifyContent: "center",
  },
  categoryText: {
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  btn: {
    backgroundColor: '#FF7208',
    paddingVertical: 10,
    paddingHorizontal:50,
    borderRadius: 10,
    alignSelf:'center'
  },
  btnText: {
    textAlign: "center",
    color: COLORS.white,
    fontFamily:FONTS.RubikSemiBold,
    fontSize: 18,
  },
  shadow:{shadowColor: "#000000",
  shadowOpacity: 0.2,
  shadowRadius: 10,
  shadowOffset: {
    height: 5,
    width: 1
  }}
});

export default styles;
