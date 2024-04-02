import { View,Text,SafeAreaView,Image, TouchableOpacity, ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import styles from './EditProfileForm.style';
import {useRouter,Stack, useNavigation} from 'expo-router';
import {COLORS,FONTS,SIZES} from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import {supabase} from '../../../src/supabase';
import { UserProfileContext } from '../../../src/providers/UserProfileProvider';
import { AuthContext } from '../../../src/providers/AuthProvider';
import ProfileImageSelector from '../../common/ProfileImageSelector/ProfileImageSelector';


const EditProfileForm = () => {
    const router = useRouter();
    const navigation =  useNavigation();
    const { userProfile, error } = useContext(UserProfileContext);
    const { session } = useContext(AuthContext);
    const [image, setImage] = useState({uri:null});
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isNavigationAllowed, setIsNavigationAllowed] = useState(true)
    const [fields, setFields] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        celular: "",
      });
      const [validFields, setValidFields] = useState({
        nombres: true,
        apellidos: true,
        email: true,
        celular: true,
      });
    let profPic = null;
  
    

    useEffect(()=>{
        if(userProfile){
            console.log("ya agarro algo bien")
            profPic = userProfile.foto;
            setImage({uri:profPic})
            setFields({nombres:userProfile.nombres, apellidos:userProfile.apellidos, email:userProfile.email, celular:userProfile.celular})
            
        } else {
            console.log("no agarra")
        }
    },[userProfile])

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            console.log('onback');
            // Do your stuff here
            navigation.dispatch(e.data.action);
        });
    },[])

    const handleChange = (field, value) => {
        setFields({
          ...fields,
          [field]: value,
        });
      };

      useEffect(() => {
        console.log(fields)
      },[fields])

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown:true,
                    headerStyle: {backgroundColor: COLORS.white},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ReturnButton/>
                    ),
                    headerTitle: "Editar Perfil",
                    headerTitleStyle: {fontFamily:FONTS.RubikMedium, fontSize:24}
                }}/>
        <ScrollView>
          <ProfileImageSelector profPic={image} onImageChange={setImage}/>
          <View style={styles.userInfoContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Nombre(s)
                </Text>
                <BaseTextInput
                    style={validFields.nombres ? styles.input : styles.badInput}
                    onChangeText={(value) => handleChange("nombres", value)}
                    value={fields.nombres}
                />
                {!validFields.nombres &&
                    <Text style={styles.badText}>
                        Ingresa tu(s) nombre(s)
                    </Text>
                }
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Apellido(s)
                </Text>
                <BaseTextInput
                    style={validFields.apellidos ? styles.input : styles.badInput}
                    onChangeText={(value) => handleChange("apellidos", value)}
                    value={fields.apellidos}
                />
                {!validFields.apellidos &&
                    <Text style={styles.badText}>
                        Ingresa tu(s) apellidos(s)
                    </Text>
                }
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Email
                </Text>
                <BaseTextInput
                    style={styles.emailInput}
                    value={fields.email}
                    editable={false}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Celular
                </Text>
                <BaseTextInput
                    keyboardType="numeric"
                    inputMode="numeric"
                    style={validFields.celular ? styles.input : styles.badInput}
                    onChangeText={(value) => handleChange("celular", value)}
                    value={fields.celular}
                />
                {!validFields.celular &&
                    <Text style={styles.badText}>
                        Ingresa un número de celular
                    </Text>
                }
            </View>
          <TouchableOpacity
                style={[styles.btn, styles.shadow, {width:250}]}
                onPress={() => {router.navigate("users/EditPassword")}}
                >
                    <Text style={styles.btnText}>Cambiar Contraseña</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity
                style={[styles.btn, styles.shadow]}
                onPress={() => {}}
                >
                    <Text style={styles.btnText}>Guardar Cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.cancelText}> Cancelar </Text>
            </TouchableOpacity>
            </View>  
        </ScrollView>
       
        </SafeAreaView>      
    )
}

export default EditProfileForm;