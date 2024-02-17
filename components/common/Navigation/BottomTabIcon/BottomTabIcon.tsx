import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import MainIcon from '../../../../assets/images/navigation/main.svg'
import TrendingIcon from '../../../../assets/images/navigation/trending.svg'
import LikedIcon from '../../../../assets/images/navigation/liked.svg'
import ProfileIcon from '../../../../assets/images/navigation/profile.svg'
import { COLORS } from '../../../../constants/theme';
import Svg, { Circle, G } from 'react-native-svg';
import { StyleSheet } from "react-native";
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';


interface Props {
  route: string;
  isFocused: boolean;
}

const BottomTabIcon = ({route, isFocused}: Props) => {
  let iconSize: number = 24;
  const iconColor = isFocused ? COLORS.white : COLORS.lightDark;

  FadeIn.duration(4000).easing(Easing.ease);;
  FadeOut.duration(4000).easing(Easing.ease);;

  const renderIcon = (route: string) => {
    switch (route) {
      case 'Main':
        return <MainIcon width={iconSize} height={iconSize} style={{ color: iconColor }} />;
      case 'Trending':
        return <TrendingIcon width={iconSize} height={iconSize} style={{ color: iconColor }} />;
      case 'Liked':
        return <LikedIcon width={iconSize} height={iconSize} style={{ color: iconColor }} />;
      case 'Profile':
        return <ProfileIcon width={iconSize} height={iconSize} style={{ color: iconColor }} />;
      default:
        return null;
    }
  };

  return <View style={styles.iconContainer}>{renderIcon(route)}</View>

};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default BottomTabIcon;