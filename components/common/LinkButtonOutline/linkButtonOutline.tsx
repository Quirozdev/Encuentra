import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './linkButtonOutline.style';
import { COLORS, FONTS } from '../../../constants/theme';

const linkButtonOutline = ({ text, handleNavigate }) => {
    return (
        <View style={styles.button}>
            <TouchableOpacity onPress={handleNavigate}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>

    )
}

export default linkButtonOutline;