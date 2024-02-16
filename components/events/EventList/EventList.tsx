import React, { useContext, useEffect, useState } from "react";
import { View,Text, ImageBackground, ImageSourcePropType,ImageResizeMode } from "react-native";
import { convertTimeTo12HourFormat, formatDate, sumDaysToDate } from "../../../src/lib/dates";
import styles from "./EventList.style";
import { getAllEvents, getAllEventsWithCategories } from "../../../src/services/events";
import Animated, { ZoomIn } from "react-native-reanimated";
import { Event } from "../../../src/types/events.types";
import { supabase } from "../../../src/supabase";
import MapPin from "../../../assets/images/map_pin.svg";
import { EventsContext } from "../../../src/providers/EventsProvider";


export default function EventList() {
  const { events } = useContext(EventsContext);


  function getImageUrl(id:number,fileName:string):string{
    const { data } = supabase
      .storage
      .from('imagenes_eventos')
      .getPublicUrl(`${id}/${fileName}`)


    return data.publicUrl;
  }

  return (
    <View style={styles.container}>
        {events.map((event,index)=>
        <Animated.View key={index}  style={styles.card} entering={ZoomIn}>
          <ImageBackground style={{flex:1}} imageStyle={{ borderRadius: 10}} source={{uri:getImageUrl(event.id,event.portada)}} resizeMode='cover'>
            <View style={styles.content}>
          <View >
            <Text style={styles.subtitleText}>{formatDate(event.fecha)}</Text>
            <Text style={styles.subtitleText}>{convertTimeTo12HourFormat(event.hora)}</Text>
          </View>
          <View style={{gap:5}}>
          <Text style={styles.titleText}>{event.nombre}</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <MapPin />
          <Text style={styles.subtitleText}>{event.direccion}</Text>
          </View>
          <View style={{alignSelf:'flex-end',flexDirection:'row',gap:4}}>
          {event.categorias.map((categoria,index)=>{
            return <View key={index} style={{backgroundColor:categoria.color,padding:5,borderRadius:100}}>
            <Text >{categoria.emoji}</Text>
            </View>
          
          
          })}
          </View>
          
          </View>
          </View>
          </ImageBackground>
        </Animated.View>
        
        )}
    </View>
  );
}
