import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReturnButton from '../common/ReturnButton/ReturnButton';



const MainScreen = () => {
     const router = useRouter();
    
  return (
    
    <SafeAreaView style={styles.container}>
       <TouchableOpacity onPress={() => router.push("/events/create")}>
      <AntDesign name="pluscircle" size={24} color={COLORS.purple} />
      </TouchableOpacity> 
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});