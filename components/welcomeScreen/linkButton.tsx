import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from '../common/LinkButton/linkButton.style';

// Botón con gradiente que permite navegar a otra pantalla
const LinkButton = ({ text, handleNavigate }) => {
    return (
        <LinearGradient
            colors={['#71CFB7','#F89745','#9D9DFD']}
            style={styles.button}
            locations={[0.1,0.3,1]}
            start={{x:0,y:-1}}
            end={{x:1,y:1}}
        >
            <TouchableOpacity onPress={handleNavigate}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

//Boton con color solido que permite navegar a otra pantalla
const LinkButton2 = ({ text, handleNavigate }) => {
    return (
        <View style={{
            borderRadius: 10,
            width: 300,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <TouchableOpacity onPress={handleNavigate}>
                <Text style={{
                    color: "orange",
                    fontSize: 20,
                    fontFamily: "Rubik-SemiBold",
                
                }}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export { LinkButton, LinkButton2 };