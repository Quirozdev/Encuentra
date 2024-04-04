import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import styles from "./CategoryGrid.style";
import { getAllCategories } from "../../../src/services/categories";
import Animated, {  FadeInDown, FadeOutUp, ZoomOut, useAnimatedStyle, withSpring} from "react-native-reanimated";
import { Entypo } from '@expo/vector-icons';
import { COLORS, FONTS } from "../../../constants/theme";
import { CategoriesContext } from "../../../src/providers/CategoryProvider";
import { EventsContext } from "../../../src/providers/EventsProvider";
import { FilterContext } from "../../../src/providers/FilterProvider";
export default function CategoryGrid() {
  const {categories,setSelectedCategories,selectedCategories} = useContext(CategoriesContext)
  const {events,setEvents,unfilteredEvents} = useContext(EventsContext);
  const [showMore, setShowMore] = useState(false);
  const screenWidth = useWindowDimensions().width;
  const columnWidth = (screenWidth-55) / 4;
  const { filterEvents} = useContext(FilterContext);

  function handleSelectCategory(id:number){
    if (selectedCategories.includes(id)){
      const newList= selectedCategories.filter(number => number !== id);
      setSelectedCategories(newList);
filterEvents(newList);
      
    } else{
      setSelectedCategories([...selectedCategories,id]);
      filterEvents([...selectedCategories,id]);
    }
  }

  const animation = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(showMore ? 10 : 0) }],
  }));


  return (
    <View  >
    <View style={styles.container} >
{categories.slice(0, showMore ? categories.length : 8).map((item,index)=> 
<Animated.View entering={FadeInDown} key={index} style={[styles.category,selectedCategories.includes(item.id) && styles.selectedCategory, {backgroundColor:item.color, width: columnWidth }]}>
  <TouchableOpacity onPress={()=>handleSelectCategory(item.id)} style={styles.categoryContainer}>
  <Text style={{fontSize:35}}>{item.emoji}</Text>
  <Text style={styles.text}>{item.nombre}</Text>
  </TouchableOpacity>
</Animated.View>
)}

</View>
<Animated.View style={animation}>
<TouchableOpacity onPress={() => setShowMore(!showMore)} style={{flexDirection:'row', justifyContent:'center',marginTop:10,alignItems:'center'}}>
  <Text style={{color:COLORS.grey,fontSize:11,fontFamily:FONTS.RubikRegular,fontWeight:'400'}}>{showMore ? 'Ocultar' : 'Mostrar más'}</Text>
  {showMore ? <Entypo name="chevron-small-up" size={20} color={COLORS.grey} /> : <Entypo name="chevron-small-down" size={20} color={COLORS.grey} />}
</TouchableOpacity>
</Animated.View>
</View >
      )


}
