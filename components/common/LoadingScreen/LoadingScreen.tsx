import { Text, View, Modal, ActivityIndicator } from 'react-native';

import styles from './LoadingScreen.style';


const LoadingScreen = ({loading}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}>
               <View style={styles.modalBackground}>
                        <ActivityIndicator size="small"/>
                </View>
        </Modal>
    );
}

export default LoadingScreen;