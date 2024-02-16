import React from 'react';
import { TouchableOpacity} from 'react-native';
import styles from './ExitButton.styles';
import Back from '../../../assets/images/back.svg';

const ExitButton = ({handlePress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Back/>
        </TouchableOpacity>
    )
}

export default ExitButton;