import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MainIcon from "../../../../assets/images/navigation/main.svg";
import TrendingIcon from "../../../../assets/images/navigation/trending.svg";
import LikedIcon from "../../../../assets/images/navigation/liked.svg";
import ProfileIcon from "../../../../assets/images/navigation/profile.svg";
import { COLORS } from "../../../../constants/theme";
import Svg, { Circle, G } from "react-native-svg";
import { StyleSheet } from "react-native";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../src/app/store";

interface Props {
  route: string;
  isFocused: boolean;
}

const BottomTabIcon = ({ route, isFocused }: Props) => {
  let iconSize: number = 24;
  const iconColor = isFocused ? COLORS.white : COLORS.lightDark;

  FadeIn.duration(4000).easing(Easing.ease);
  FadeOut.duration(4000).easing(Easing.ease);

  const { notificacionesPendientesDeVer } = useSelector(
    (state: RootState) => state.notifications
  );

  const renderIcon = (route: string) => {
    switch (route) {
      case "Main":
        return (
          <MainIcon
            width={iconSize}
            height={iconSize}
            style={{ color: iconColor }}
          />
        );
      case "Trending":
        return (
          <TrendingIcon
            width={iconSize}
            height={iconSize}
            style={{ color: iconColor }}
          />
        );
      case "Create":
        return (
          <MaterialCommunityIcons
            name="plus-box"
            size={iconSize}
            color="white"
          />
        );
      case "Liked":
        return (
          <LikedIcon
            width={iconSize}
            height={iconSize}
            style={{ color: iconColor }}
          />
        );
      case "Profile":
        return (
          <View>
            <ProfileIcon
              width={iconSize}
              height={iconSize}
              style={{ color: iconColor }}
            />
            <View
              style={[
                notificacionesPendientesDeVer && styles.pendingEventsIndicator,
              ]}
            ></View>
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.iconContainer}>{renderIcon(route)}</View>;
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pendingEventsIndicator: {
    width: 15,
    height: 15,
    backgroundColor: "#735AFB",
    position: "absolute",
    top: -6,
    right: -6,
    borderRadius: 15,
  },
});

export default BottomTabIcon;
