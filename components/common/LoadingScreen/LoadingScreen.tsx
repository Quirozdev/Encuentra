import { Text, View, Modal, ActivityIndicator } from 'react-native';

import styles from './LoadingScreen.style';


const LoadingScreen = () => {
    return (
        <Modal
            animationType="fade"
            transparent={true}>
               <View style={styles.modalBackground}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                </View>
        </Modal>
    );
}

export default LoadingScreen;