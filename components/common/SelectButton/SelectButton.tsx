import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign,Entypo,Ionicons } from "@expo/vector-icons";
import Assist from '../../../assets/images/assist.svg'
import { FONTS, COLORS } from '../../../constants/theme';
export default function Select({ value, onPress, isSelected }) {
  function getIcon(value:string){
    var backgroundColor = 'transparent';
    var icon;
    switch(value){
      case "Asistiré":
        icon =  <Assist width={36} height={36} />
        break;
      case "No me gusta":
        backgroundColor = '#FD6767';
        icon = <AntDesign
        name="dislike1"
        size={20}
        color="#fff"
      /> 
      break;
      case "Me gusta":
        backgroundColor = '#2096F3'
        icon = <AntDesign
                  name="like1"
                  size={20}
                  color="#fff"
                /> 
                break;
      case 'Comentarios':
        backgroundColor = '#67FD6D'
        icon = <Entypo name="message" size={20} color="white" /> 
        break;
    }
    return <View style={{backgroundColor:backgroundColor,borderRadius:100,width:32,height:32,alignItems:'center',justifyContent:'center'}}>
      {icon}
      </View>
  }
    return <TouchableOpacity onPress={onPress}
    
    style={styles.touchable}
  >
    <View style={{gap:15,flexDirection:'row',flex:1,alignItems:'center'}}>
    {getIcon(value)}
  
  <Text style={{fontFamily:FONTS.RubikRegular,fontSize:18,color:COLORS.dark}}>{value}</Text>
  </View>
  <View style={[styles.outerCircle,{borderColor: isSelected ? '#0A7AFF' : COLORS.grey,borderWidth:isSelected ? 0 :2
}]}>

  { isSelected && <Ionicons name="checkbox" size={22} color="#0A7AFF" /> }
  </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#c36e02', borderRadius: 15, padding: 15
    },
    outerCircle: {
        borderRadius: 3,
        width: 20,
        height: 20,
        marginRight: 10,
      },
      touchable: {
        margin: 10,
        height: 30,
        borderRadius: 10,
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
      },
      innerCircle: {
        borderRadius: 5,
        borderWidth:1,
        borderColor:"#0A7AFF"
        // width: 14,
        // height: 14,
        // borderColor: 'black',
        // backgroundColor: 'black'
      },
    leftImg: { height: 40, width: 40, marginRight: 30, tintColor: 'white', resizeMode: 'contain' },
    txt: { fontSize: 30, color: 'white' },
    tick: { position: 'absolute', right: 0, height: 30, width: 30, marginRight: 30, tintColor: 'white' }
});