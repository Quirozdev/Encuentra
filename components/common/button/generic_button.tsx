import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './generic_button.style';

const GenericButton = ({text}) => {
    return (
        <LinearGradient
            colors={['#71CFB7','#F89745','#9D9DFD']}
            style={styles.button}
            locations={[0.1,0.3,1]}
            start={{x:0,y:-1}}
            end={{x:1,y:1}}
        >
            <TouchableOpacity>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default GenericButton;