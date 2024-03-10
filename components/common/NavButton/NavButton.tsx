import { Text, View, Modal, TouchableOpacity } from 'react-native';

import styles from './NavButton.styles';
import SolidColorButton from '../SolidColorButton/SolidColorButton';
import BackIcon from '../../../assets/images/BackIcon.svg';
import NextIcon from '../../../assets/images/NextIcon.svg';
import HeartIcon from '../../../assets/images/green_heart.svg'
import { transform } from 'typescript';

const NavButton = ({type, handlePress}) => {
    var text = ""
    switch (type) {
        case "back":
            text = "REGRESAR"
            break
        case "next":
            text = "SIGUIENTE"
            break
        case "invalid":
            text = "SIGUIENTE"
            break;
        case "destacar":
            text = "DESTACAR EVENTO"
        default:
            break
    }

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.container, type==="back" ? styles.backButton : styles.nextButton, type==="invalid" ? styles.invalidButton : {}]}>
            <View style={styles.view}>
                {type==="back" &&
                    <View style={styles.iconContainer}>
                        <BackIcon/>
                    </View>
                }
                <View style={[styles.textContainer, type==="back" ? styles.textContainerBack : styles.textContainerNext]}>
                    <Text style={[styles.text, type==="back" ? styles.backText : styles.nextText, type==="destacar" ? {fontSize:20}:{}]}>{text}</Text>
                </View>
                {type==="next" &&
                    <View style={styles.iconContainer}>
                        <NextIcon/>
                    </View>
                }
                {type==="invalid" &&
                    <View style={[styles.iconContainer, {transform:[{rotate:'180deg'}]} ]}>
                        <BackIcon/>
                    </View>
                }
                {type==="destacar" &&
                    <View style={styles.destacarContainer}>
                        <HeartIcon/>
                    </View>
                }
                
            </View>
        </TouchableOpacity>
    );
}

export default NavButton;