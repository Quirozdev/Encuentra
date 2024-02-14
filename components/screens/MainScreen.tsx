import {StyleSheet, TouchableOpacity, View,Text, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReturnButton from '../common/ReturnButton/ReturnButton';
import BaseTextInput from '../common/BaseTextInput/BaseTextInput';
import SearchBar from '../common/SearchBar/SearchBar';
import EventList from '../events/EventList/EventList';
import CategoryGrid from '../events/CategoryGrid/CategoryGrid';



const MainScreen = () => {
     const router = useRouter();
     const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    
  return (
    
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.content}>
  <View style={[styles.header, styles.row,styles.center]}>
        <View style={[styles.location, styles.row,styles.center]}>
        <Text style={styles.title}>Hermosillo</Text>
        <TouchableOpacity>
        <MaterialCommunityIcons name="menu-down" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        
        </View>
        
      <TouchableOpacity onPress={() => router.push("/events/create")}>
      <MaterialCommunityIcons name="plus-circle" size={24} color={COLORS.purple} />
      </TouchableOpacity> 
      </View>

    <View  style={[styles.row,styles.center,styles.search]}>
      <MaterialCommunityIcons name="filter" size={30} color={COLORS.darkMint} />
      <SearchBar clicked={clicked} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} setClicked={setClicked}/>
      </View>
      <View>
        <Text style={styles.subtitle}>Categorías</Text>
        <CategoryGrid/>
      </View>
      <View>
        <Text style={styles.subtitle}>Próximos eventos</Text>
        <EventList/>
      </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
  },
  center:{
    alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal:20,
    paddingVertical:10,
  },
  content:{ gap:20},
  header:{
    
    justifyContent: 'space-between',
    paddingHorizontal:5

  },
  search:{
    gap:10


  },
  location:{
    gap:10
  },
  subtitle:{
    fontSize:18,
    color:COLORS.dark,
    fontFamily: FONTS.RubikMedium
  },
  title:{
    fontSize:32,
    color:COLORS.dark,
    fontFamily: FONTS.RubikMedium
  }

});