import { useNavigation, useRouter } from "expo-router";
import { ActivityIndicator, SafeAreaView, StyleSheet, View, Text, FlatList, Image, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS } from "../../../constants/theme";
import preferences from "../../../src/app/notifications/preferences";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import NotificationsList from "../../notifications/NotificationsPageComponent/NotificationsList/NotificationsList";
import { useContext, useEffect, useState } from "react";
import { getAllUserEventsWithActivities } from "../../../src/services/events";
import { EventWithUserReactions, Reaction, UserEventsWithActivities } from "../../../src/types/events.types";
import { AuthContext } from "../../../src/providers/AuthProvider";
import { convertTimeTo12HourFormat, formatDateAndYearWithTextualMonth, formatHour } from "../../../src/lib/dates";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign,Entypo } from "@expo/vector-icons";
import Assist from '../../../assets/images/assist.svg'
import React from "react";
import { useFocusEffect } from 'expo-router';

export default function ActivityPage() {
  const navigation = useNavigation();

    const [events, setEvents] = useState<UserEventsWithActivities[]>(null);
    const { session } = useContext(AuthContext);
    const router = useRouter();

    const fetchEvents = () => {
      getAllUserEventsWithActivities(session.user.id)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
          } else {
            setEvents(data);
          }
        });
    };
  
    // useEffect for initial fetch
    useEffect(() => {
      fetchEvents();
    }, []); // Empty dependency array ensures it runs only once on mount
  
    useEffect(() => {
      const unsubscribeFocus = navigation.addListener('focus', () => {
        fetchEvents();
      });
  
      // Cleanup function
      return unsubscribeFocus;
    }, [navigation]);
  
    function getIcon(event:EventWithUserReactions){
      var backgroundColor = 'transparent';
      var icon;
      switch(event.reaccion_usuario){
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
        case null:
          backgroundColor = '#67FD6D'
          icon = <Entypo name="message" size={20} color="white" /> 
          break;
      }
      return <View style={{position:'absolute',right:0,bottom:0,backgroundColor:backgroundColor,borderRadius:100,width:32,height:32,alignItems:'center',justifyContent:'center'}}>
        {icon}
        </View>
    }

    const headerComponent = () => {
      return  <View style={{gap:10}}>
        <Text style={{fontSize:18,fontFamily:FONTS.RubikMedium,color:COLORS.dark}}>Eventos que interactuaste</Text>
<TouchableOpacity style={{borderRadius:6,padding:3,backgroundColor:"#D9D9D9",width:45,height:35, justifyContent:'center',alignItems:'center'}}>
<MaterialIcons name="filter-list" size={26} color="black" />
</TouchableOpacity>
      </View>
      }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ paddingLeft: 16 }}>
            <ReturnButton />
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.headerText}>Mi actividad</Text>
          </View>
        </View>
        {events == null? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size={'small'} />
          </View>
        ) : (
            <FlatList

            ListHeaderComponent={headerComponent}
            style={{flex:1,padding:15      }}

        data={events}
        renderItem={({item}) => 
        <>
        <Text style={{fontSize:20,fontFamily:FONTS.RubikMedium,color:COLORS.dark, marginVertical:15}}>{formatDateAndYearWithTextualMonth(item.date)}</Text>
        <FlatList
      keyExtractor={(item, index) => `${item.id}_${index}_${item.comentarios == null ? 'C' : 'R'}`} // Use a unique key

            data={item.events}
            renderItem={({ item: event }) => (
            <TouchableOpacity onPress={() => router.navigate(`events/details/${event.id}`)} style={[styles.shadow,{flexDirection:'row',gap:20,marginBottom:15,borderRadius:10}]}>
              <View style={{width: 105,
    height: 107,}}>
              <Image style={{
    width: 90,
    height: 100,
    resizeMode:'cover',
    borderRadius:10
  }} source={{uri:event.portada}}/>


  {getIcon(event)}

              </View>
              <View style={{justifyContent:'space-around',flex:1,gap:5,maxWidth: Dimensions.get("window").width/1.8}}>
              <Text  style={{fontSize:14,fontFamily:FONTS.RubikRegular,color:COLORS.primaryBlue}}>{formatDateAndYearWithTextualMonth(event.fecha)} • {convertTimeTo12HourFormat(event.hora)}</Text>
                <Text style={{fontSize:16,fontFamily:FONTS.RubikRegular,color:COLORS.dark}}>{event.nombre}</Text>
              
                <View style={{
                                flexDirection:'row',
                                alignSelf:'flex-end', gap:4}}>
                {event.categorias != null && event.categorias.map((categoria, index) => {
                        if (categoria != null) {
                          return (
                            <View
                              key={categoria.id}
                              style={{
                                backgroundColor: categoria.color,
                                paddingHorizontal: 3,
                                paddingVertical: 4,
                                borderRadius: 100,
                              }}
                            >
                              <Text>{categoria.emoji}</Text>
                            </View>
                          );
                        }
                      })}
                      </View>
                      <View style={{flexDirection:'row',alignItems:'center',gap:6,maxWidth: Dimensions.get("window").width/2.1}}>
                      <MaterialIcons name="location-pin" size={24} color="#747688" />
                      <Text style={{fontSize:14,fontFamily:FONTS.RubikRegular,color:"#747688"}}>{event.direccion} • {event.nombre_municipio}</Text>
                      </View>
                      
                </View>
            </TouchableOpacity>
            )}        />
      </>}
      />
     )
       } 
       
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: COLORS.white,
      gap: SIZES.large,
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop:12,

      // justifyContent: "space-between",
      // paddingRight: 16,
      // paddingLeft: 16,
    },
    flexContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    headerText: {
      fontFamily: FONTS.RubikMedium,
      fontSize: 24,
      textAlign: "center",
      color: COLORS.darkBlue,
    },
    noAvailableNotificationsContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noAvailableNotificationsText: {
      fontFamily: FONTS.RubikRegular,
      fontSize: 18,
      color: "#706E8F",
      textAlign: "center",
    },
    noPreferencesSelectedBtn: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 24,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 16,
      paddingRight: 16,
    },
    noPreferencesSelectedBtnText: {
      fontFamily: FONTS.RubikMedium,
      fontSize: 14,
      color: COLORS.grey,
    },
    shadow:{
      backgroundColor:'white',
      padding:8,
      shadowColor: "#575C8A",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.06,
shadowRadius: 4,

elevation: 10,
    }
  });
  