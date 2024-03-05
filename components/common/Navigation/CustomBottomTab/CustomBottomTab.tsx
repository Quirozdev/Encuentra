/* eslint-disable react-native/no-inline-styles */
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
  } from 'react-native';
  import React from 'react';
  import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
  import Animated, {useAnimatedStyle, withTiming,FadeIn, FadeOut, withSpring} from 'react-native-reanimated';
  import {useSafeAreaInsets} from 'react-native-safe-area-context';
  import BottomTabIcon from '../BottomTabIcon/BottomTabIcon';
import { COLORS } from '../../../../constants/theme';

// Código obtenido de https://github.com/Rakha112/react-native-animation/tree/main/src/14-React-Native-Custom-Animated-Bottom-Tab
  
  const CustomBottomTab = ({
    state,
    descriptors,
    navigation,
  }: BottomTabBarProps) => {
    // I'm using the inset from react-native-safe-area-context as the bottom value.
    // If you're not using react-native-safe-area-context, you can change it according to your needs.
    const {width} = useWindowDimensions();
    const TAB_BAR_WIDTH = width;
    const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;
  
    const translateAnimation = useAnimatedStyle(() => {
      return {
        transform: [{translateX: withTiming(TAB_WIDTH * state.index) }],
      };
    });
  
    const fadeAnimation = useAnimatedStyle(() => {
      return {
        opacity: state.index === 2 ? withSpring(0) : withSpring(1)
      };
    });
    return (
      <View
        style={[
          styles.tabBarContainer,
          {width: width, bottom: 0},
        ]}>
          
        <Animated.View
          style={[
            styles.slidingTabContainer,
            {width: TAB_WIDTH},
            translateAnimation,fadeAnimation
          ]}>
          <View style={styles.slidingTab} />
        </Animated.View>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name, {merge: true});
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}>
          <View style={index == 2 ? styles.centerButton : styles.contentContainer}>
                <BottomTabIcon route={route.name} isFocused={isFocused} />
              </View>
              
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  
  export default CustomBottomTab;
  
  const styles = StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      height: 100,
      alignSelf: 'center',
      backgroundColor: COLORS.darkWhite,
      borderTopRightRadius:60,
      borderTopLeftRadius: 60,
      marginTop: -40,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    centerButton:{
      width:50,
      height:50,
      alignSelf:'center',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      shadowColor: "#4A43EC",
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: {
        height: 10,
        width: 1,
      },
      backgroundColor:'#7056FF',
      borderRadius:100,
    },
    slidingTabContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    slidingTab: {
      width: 40,
      height: 40,
      borderRadius: 100,
      backgroundColor: COLORS.darkOrange,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
    },
  });
  