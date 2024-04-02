import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './linkButtonOutline.style';
import { COLORS, FONTS } from '../../../constants/theme';

const linkButtonOutline = ({ text, handleNavigate, small=false }) => {
    return (
        <View style={[styles.button, !small && styles.border]}>
            <TouchableOpacity onPress={handleNavigate}>
                <Text style={small? styles.textSmall: styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>

    )
}

export default linkButtonOutline;