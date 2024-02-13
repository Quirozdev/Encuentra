import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const LikedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>LikedScreen</Text>
    </SafeAreaView>
  );
};

export default LikedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});