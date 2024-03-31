import { Text, TouchableOpacity, View } from "react-native";
import ArrowIcon from "../../../assets/images/arrow.svg";
import { Svg, SvgProps } from "react-native-svg";
import React from "react";
import styles from "./profileScreenButton.style";

interface ProfileScreenButtonProps {
  text: string;
  icon: React.FC<Svg>;
  onPress: () => void;
  displayNotificationCircle?: boolean;
}

export default function ProfileScreenButton({
  text,
  icon,
  onPress,
  displayNotificationCircle = false,
}: ProfileScreenButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconTextContainer}>
        <View style={styles.iconContainer}>
          {icon()}
          {displayNotificationCircle && (
            <View style={[styles.pendingEventsIndicator]}></View>
          )}
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <ArrowIcon style={{ color: "#404040" }} />
    </TouchableOpacity>
  );
}
