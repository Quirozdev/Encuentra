import React from 'react';
import { TouchableOpacity,Image } from 'react-native';
import styles from './returnButton.style';
import BackArrow from '../../../assets/images/back_arrow.svg';

const ReturnButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <BackArrow/>
        </TouchableOpacity>
    )
}

export default ReturnButton;