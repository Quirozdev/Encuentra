import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const TrendingScreen = () => {
  return (
    
    <SafeAreaView style={styles.container}>
      <Text>TrendingScreen</Text>
    </SafeAreaView>
  );
};

export default TrendingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});