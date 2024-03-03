import { ActivityIndicator, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { COLORS, FONTS } from "../../../constants/theme";
import { convertTimeTo12HourFormat, formatStrDateToSpanish, getDayOfWeek } from "../../../src/lib/dates";
import styles from "./eventDetails.style";
import { EventFieldsViewProps } from "../../../src/app/events/[id]";
import { TextInput } from "react-native-gesture-handler";
import LinkButton from "../../common/LinkButton/linkButton";
import { FontAwesome6 } from '@expo/vector-icons';
import Calendar from '../../../assets/images/event_details/Calendar.svg';
import Location from '../../../assets/images/event_details/Location.svg';
import Category from '../../../assets/images/event_details/Category.svg';
import Profile from '../../../assets/images/navigation/profile.svg';

import BackArrow from '../../../assets/images/back_arrow.svg';
import { useCallback, useEffect, useState } from "react";
import { getOrganizador } from "../../../src/services/events";
import { AntDesign } from '@expo/vector-icons';
import { User } from "../../../src/types/users.types";
import { set } from "date-fns";
import { getGeographicInformationFromLatLong } from "../../../src/services/geography";

interface EventComponentProps {
  event: EventFieldsViewProps;
}

export default function EventDetailsComponent({ event }:EventComponentProps) {
  const router = useRouter();
  const [organizador,setOrganizador]=useState<User>(null);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [address, setAddress] = useState(null); //To show ur remaining Text
  const [imgLoading,setImgLoading]=useState(true);

  useEffect(()=>{
    getGeographicInformationFromLatLong(event.latitud_ubicacion,event.longitud_ubicacion).then((data)=>{
     setAddress(data.results[0].formatted);
    })
    getOrganizador(event.id_usuario).then((data)=>{
      setOrganizador(data);
    })

    
  },[])

  return (

  <>
  {address == null || organizador ==null ?       <ActivityIndicator size="small" color="grey" />
  :

  <ScrollView contentContainerStyle={styles.container}>
    <ImageBackground onLoadEnd={()=>setImgLoading(false)} style={styles.eventImage} source={{uri:event.portada}} resizeMode='cover'>
      <SafeAreaView>
      <TouchableOpacity  onPress={() => router.back()}>
        <View style={styles.button}>
        <BackArrow style={{ color: 'white' }}/>
        </View>
     
      </TouchableOpacity>
      </SafeAreaView>
      <ActivityIndicator size="small" color="grey" animating={imgLoading}/>

    </ImageBackground>
      <View style={[styles.reactions,styles.shadow]}>
        <TouchableOpacity style={styles.reactionBtn}>
      <AntDesign name="like1" size={24} color={COLORS.veryLightGrey} />
      <Text style={styles.reactionCount}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reactionBtn}><AntDesign name="dislike1" size={24} color={COLORS.veryLightGrey}  />
      <Text style={styles.reactionCount}>0</Text></TouchableOpacity>
      
      <TouchableOpacity style={styles.reactionBtn}>
      <FontAwesome6 name="clipboard-user" size={24} color={COLORS.veryLightGrey}/>
      
      <Text style={styles.reactionCount}>0</Text></TouchableOpacity>
      
      </View>
      <View style={{padding:24,gap:15}}>
        <Text style={styles.title}>{event.nombre}</Text>
       <View style={styles.info}>
        <View style={styles.icon}>
        <Calendar style={{ color: 'rgba(6, 187, 142, 1)' }}/>
        </View>
        <View>
          
          <Text style={styles.header}>{formatStrDateToSpanish(event.fecha)}</Text>
          <Text style={styles.subtitle}>{getDayOfWeek(event.fecha)}, {convertTimeTo12HourFormat(event.hora)} - {event.duracion} Hrs.</Text>
        </View>
       </View>

       <View style={styles.info}>
        <View style={styles.icon}>
        <Location style={{ color: 'rgba(6, 187, 142, 1)' }}/>
        </View>
        <View style={{flex:1}}>
          
          <Text style={styles.header}>{event.direccion}</Text>
          <Text style={styles.subtitle}>{address}</Text>
        </View>
       </View>
       <View style={styles.info}>
        <View style={styles.icon}>
        <Category style={{ color: 'rgba(6, 187, 142, 1)' }}/>
        </View>
        <View style={{flex:1}}>
          
          <Text style={styles.header}>{event.categorias.map(categoria => categoria.nombre).join(', ')}</Text>
        </View>
       </View>


       <View style={styles.info}>
        <View style={styles.icon}>
        <Text style={{ color: 'rgba(6, 187, 142, 1)',fontFamily:FONTS.RubikRegular,fontSize:18 }}>$</Text>
        </View>
        <View>
          
          <Text style={styles.header}>{event.costo == 0 ? 'Sin costo' : `$${event.costo.toFixed(2)}`}</Text>
          
        </View>
       </View>
       <View style={[styles.info,{justifyContent:'center'}]}>
        <View style={styles.icon}>
        <Profile style={{ color: 'rgba(6, 187, 142, 1)' }}/>
        </View>
        <View>
          
          <Text style={styles.header}>{`${organizador.nombres} ${organizador.apellidos}`}</Text>

          <Text style={styles.subtitle}>Organizador</Text>
          <Text style={styles.subtitle}>{`+52 ${organizador.celular.slice(0, 3)} ${organizador.celular.slice(3, 6)} ${organizador.celular.slice(6)}`}</Text>
          <Text style={styles.subtitle}>{organizador.email}</Text>
        </View>
       </View>
       <Text style={styles.heading}>Acerca del evento</Text>
       {!textShown ? (
      <Text style={styles.description}>
        {event.descripcion.slice(0, 190)}{' '}
        {event.descripcion.length > 190 && (
          <Text style={styles.moreText} onPress={()=>setTextShown(true)}>Read More...</Text>
        )}{' '}
      </Text>
    ) : (
        <Text  style={styles.description}>{event.descripcion} <Text style={styles.moreText} onPress={()=>setTextShown(false)}>Read Less...</Text></Text>
        
    )}
       <Text style={styles.heading}>Comentarios del evento</Text>
       <View style={{flexDirection:'row',gap:20}}>
       <Profile style={{ color: 'rgba(6, 187, 142, 1)',transform: [{ scale: 1.4 }],marginLeft:5 }}/>
       <View style={{flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.heading}>Rocks Velkeinjen</Text>
        <Text style={{fontFamily:FONTS.RubikRegular,fontSize:15,color:'#ADAFBB'}}>10 Feb</Text>
        </View>
        <Text style={styles.description}>Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.</Text>
       </View>
       </View>
       
       <TextInput placeholder="Deja tu comentario del evento" style={styles.input}></TextInput>
       <TouchableOpacity style={[styles.btn,styles.shadow]}>
        <Text style={styles.btnText}>Enviar</Text></TouchableOpacity>
       </View>
      </ScrollView>
      }
      </>
      
  );
}
