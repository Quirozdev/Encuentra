import { Text, View, Modal, TouchableOpacity } from 'react-native';

import styles from './NavButton.styles';
import SolidColorButton from '../SolidColorButton/SolidColorButton';
import BackIcon from '../../../assets/images/BackIcon.svg';
import NextIcon from '../../../assets/images/NextIcon.svg';

const NavButton = ({type, handlePress}) => {
    var text = ""
    switch (type) {
        case "back":
            text = "REGRESAR"
            break
        case "next":
            text = "SIGUIENTE"
            break
        default:
            break
    }

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.container, type==="back" ? styles.backButton : styles.nextButton]}>
            <View style={styles.view}>
                {type==="back" &&
                    <View style={styles.iconContainer}>
                        <BackIcon/>
                    </View>
                }
                <View style={[styles.textContainer, type==="back" ? styles.textContainerBack : styles.textContainerNext]}>
                    <Text style={[styles.text, type==="back" ? styles.backText : styles.nextText]}>{text}</Text>
                </View>
                {type==="next" &&
                    <View style={styles.iconContainer}>
                        <NextIcon/>
                    </View>
                }
                
            </View>
        </TouchableOpacity>
    );
}

export default NavButton;