import {Text, View, TouchableOpacity} from 'react-native';

import styles from './RegisterForm.style';
import BaseTextInput from '../../common/BaseTextInput/BaseTextInput';
import LinkButton from '../../common/LinkButton/linkButton';
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const RegisterForm = () => {
    return (
        <View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Registrarse
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <BaseTextInput placeholder='Nombre(s)' style={styles.input}/>
                <BaseTextInput placeholder='Apellido(s)' style={styles.input}/>
                <BaseTextInput placeholder='Correo electrónico' style={styles.input}/>
                <BaseTextInput placeholder='Contraseña' style={styles.input}/>
                <BaseTextInput placeholder='Celular' style={styles.input}/>
            </View>

            <View style={styles.button}>
                <LinkButton text="Crear cuenta" handleNavigate={()=>{}}/>
            </View>

            <View style={styles.textContainer1}>
                <Text style={{color:COLORS.red}}>
                    *
                    <Text style={styles.text}>
                        Campos son obligatorios
                    </Text>
                </Text>
            </View>

            <View style={styles.textContainer2}>
                <Text style={styles.text}>
                    ¿Ya tienes una cuenta?{' '}
                    <Text style={{color:COLORS.darkOrange, fontFamily:FONTS.RubikBold}}>
                        Inicia Sesión
                    </Text>
                </Text>
            </View>

        </View>

    )
}

export default RegisterForm