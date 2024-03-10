import { Text, View, Modal, TouchableOpacity } from 'react-native';

import styles from './CreateEventButton.styles';
import SolidColorButton from '../SolidColorButton/SolidColorButton';
import BackIcon from '../../../assets/images/BackIcon.svg';
import NextIcon from '../../../assets/images/NextIcon.svg';
import CreateIcon from '../../../assets/images/create_icon.svg';

const CreateEventButton = ({handlePress}) => {
    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View style={styles.view}>
                <View style={styles.iconContainer}>
                    <CreateIcon/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Crear evento</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default CreateEventButton;