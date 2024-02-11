import React from 'react';
import { TouchableOpacity,Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './returnButton.style';

const ReturnButton = () => {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Image source={require('../../../assets/images/back_arrow.png')} />
        </TouchableOpacity>
    )
}

export default ReturnButton;