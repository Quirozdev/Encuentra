import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../../constants/theme';

export default function Radio({ icon, onPress, isSelected, text }) {
    return <TouchableOpacity
    onPress={onPress}
    style={styles.touchable}
  >
    <View style={{gap:15,flexDirection:'row',flex:1}}>
  <MaterialCommunityIcons name={icon} size={24} color="black" />
  <Text style={{fontFamily:FONTS.RubikRegular,fontSize:18,color:COLORS.dark}}>{text}</Text>
  </View>
  <View style={[styles.outerCircle,{ borderColor: isSelected ? '#0A7AFF' :'#636366',}]}>
  { isSelected && <View style={styles.innerCircle} /> }
  </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#c36e02', borderRadius: 15, padding: 15
    },
    outerCircle: {
        borderRadius: 10,
        borderWidth: 2,
        width: 20,
        height: 20,
       
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      touchable: {
        margin: 10,
        height: 30,
        //flex:1,
        //flexWrap:'wrap',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        flexDirection: 'row',
      },
      innerCircle: {
        borderRadius: 10,
        width: 12,
        height: 12,
        borderColor: '#0A7AFF',
        backgroundColor: '#0A7AFF'
      },
    leftImg: { height: 40, width: 40, marginRight: 30, tintColor: 'white', resizeMode: 'contain' },
    txt: { fontSize: 30, color: 'white' },
    tick: { position: 'absolute', right: 0, height: 30, width: 30, marginRight: 30, tintColor: 'white' }
});