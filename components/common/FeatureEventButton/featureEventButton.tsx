import { Text, View, TouchableOpacity } from 'react-native';
import FeatureEventIcon from '../../../assets/images/FeatureEventIcon.svg'
import styles from './featureEventButton.style';
import { useRouter } from 'expo-router';


const FeatureEventButton = ({}) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container} onPress={()=>{router.push("/events/featureEvent")}}>
                <FeatureEventIcon/>
                <Text style={styles.text}>Destacar evento</Text>
            </TouchableOpacity>
        </View>

        
    );
}

export default FeatureEventButton;