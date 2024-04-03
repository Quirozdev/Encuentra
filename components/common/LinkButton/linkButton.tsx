import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/theme';

import styles from './linkButton.style';

const LinkButton = ({ text, handleNavigate }) => {
    return (
        <TouchableOpacity onPress={handleNavigate}>
        <LinearGradient
            colors={[COLORS.darkOrange, COLORS.darkOrange, COLORS.darkOrange]}
            style={styles.button}
            locations={[0.1,0.3,1]}
            start={{x:0,y:-1}}
            end={{x:1,y:1}}
        >
            <Text style={styles.text}>{text}</Text>
        </LinearGradient>
        </TouchableOpacity>

    )
}

export default LinkButton;