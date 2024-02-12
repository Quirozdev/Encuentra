import React from 'react';
import { TouchableOpacity,Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './returnButton.style';
import BackArrow from '../../../assets/images/back_arrow.svg';

const ReturnButton = () => {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <BackArrow/>
        </TouchableOpacity>
    )
}

export default ReturnButton;