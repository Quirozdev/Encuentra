import React from 'react';
import { TouchableOpacity,Image } from 'react-native';
import styles from './returnButton.style';

const ReturnButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Image source={require('../../../assets/images/back_arrow.png')} />
        </TouchableOpacity>
    )
}

export default ReturnButton;