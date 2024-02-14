import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import styles from "./CategoryGrid.style";
import { getAllCategories } from "../../../src/services/categories";
import { FlatList} from 'react-native';
import Animated, { Easing, FadeIn, FadeInDown, FadeInUp, FadeOut, FadeOutDown, FadeOutLeft, FadeOutUp, LinearTransition, SlideInDown, SlideInUp, SlideOutDown, StretchInX, StretchOutX, ZoomIn, ZoomInEasyDown, ZoomInEasyUp, ZoomOut, ZoomOutEasyDown, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Entypo } from '@expo/vector-icons';
import { COLORS, FONTS } from "../../../constants/theme";
export default function CategoryGrid() {
  const [categories,setCategories] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [size, setSize] = useState(false); // we handle the show more state here
  const screenWidth = useWindowDimensions().width;
  const columnWidth = (screenWidth / 4)-15;
  const translateY = useSharedValue(0);

  useEffect(() => {
    getAllCategories().then(({ data, error }) => {
      setCategories(data);
    });
  }, []);

  const animation = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(showMore ? 10 : 0) }],
  }));


  return (
    <View  >
    <View style={styles.container} >
    {/* <FlatList
  data={categories}
  renderItem={({ item,index }) => {
    if (showMore) { // we display all items if show more state is true
    return (
      <View style={[styles.category,{backgroundColor:item.color}]}>
      <Text style={{fontSize:40}}>{item.emoji}</Text>
      <Text style={styles.text}>{item.nombre}</Text>
    </View>
     )
   
   } else {
     if (index < 8) { // here we control how many items are displayed if show more is false
      return  (
          <View style={[styles.category,{backgroundColor:item.color}]}>
        <Text style={{fontSize:40}}>{item.emoji}</Text>
        <Text style={styles.text}>{item.nombre}</Text>
      </View>
      )}}}}
      //Setting the number of column
  numColumns={4}
  keyExtractor={(item, index) => index.toString()}
 

/> */}
{categories.slice(0, showMore ? categories.length : 8).map((item,index)=> 
<Animated.View entering={FadeInDown} exiting={FadeOutUp.duration(75)} key={index} style={[styles.category,{backgroundColor:item.color, width: columnWidth }]}>
  <Text style={{fontSize:40}}>{item.emoji}</Text>
  <Text style={styles.text}>{item.nombre}</Text>
</Animated.View>)}

</View>
<Animated.View style={animation}>
<TouchableOpacity onPress={() => setShowMore(!showMore)} style={{flexDirection:'row', justifyContent:'center',marginTop:15,alignItems:'center'}}>
  <Text style={{color:COLORS.grey,fontSize:11,fontFamily:FONTS.RubikRegular,fontWeight:400}}>{showMore ? 'Ocultar' : 'Mostrar más'}</Text>
  {showMore ? <Entypo name="chevron-small-up" size={20} color={COLORS.grey} /> : <Entypo name="chevron-small-down" size={20} color={COLORS.grey} />}
</TouchableOpacity>
</Animated.View>
</View >
      )


}
