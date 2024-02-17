import {StyleSheet, Text} from 'react-native';
import React, { useContext } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinkButton from '../common/LinkButton/linkButton';
import { supabase } from '../../src/supabase';

const ProfileScreen = () => {
  function logOut(){
    supabase.auth.signOut();
    
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>ProfileScreen</Text>
      <LinkButton text='Logout' handleNavigate={logOut} ></LinkButton>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});