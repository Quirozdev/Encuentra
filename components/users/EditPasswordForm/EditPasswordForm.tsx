import { View,Text,SafeAreaView,Image, TouchableOpacity, ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import PasswordTextInput from "../../common/PasswordTextInput/PasswordTextInput";
import LinkButton from '../../common/LinkButton/linkButton';
import styles from './EditPasswordForm.style';
import ModalOneButton from '../../common/Modal_1Button/Modal_1Button';
import {useRouter,Stack, useNavigation} from 'expo-router';
import {COLORS,FONTS,SIZES} from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import {supabase} from '../../../src/supabase';
import AppState from '../../../src/lib/refreshAuth';
import React from 'react';
import { UserProfileContext } from '../../../src/providers/UserProfileProvider';
import { AuthContext } from '../../../src/providers/AuthProvider';
import NoAvatarIcon from "../../../assets/images/profile_screen/noAvatar.svg";
import {LinearGradient} from "expo-linear-gradient";
import PasswordInput from '../../common/PasswordTextInput/PasswordTextInput';
import NavButton from '../../common/NavButton/NavButton';
import ProfileImageSelector from '../../common/ProfileImageSelector/ProfileImageSelector';
import LoadingScreen from '../../common/LoadingScreen/LoadingScreen';
import CustomBottomTab from '../../common/Navigation/CustomBottomTab/CustomBottomTab';

const EditPasswordForm = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const { userProfile, error } = useContext(UserProfileContext);
    const { session } = useContext(AuthContext);
    const [image, setImage] = useState({uri:null});
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fields, setFields] = useState({
        contrasenaOG: "",
        contrasenaNew1: "",
        contrasenaNew2: "",
      });
      const [validFields, setValidFields] = useState({
        contrasenaOG: true,
        contrasenaNew1: true,
        contrasenaNew2: true

      });
    let profPic = null;
    const passwordRegex = new RegExp(
        "^(?=.*[A-ZÑ])(?=.*\\d)[A-Za-zÑñ\\d@$!%*?&-_]{8,15}$"
      );
  

    useEffect(()=>{
        if(userProfile){
            profPic = userProfile.foto;
            setImage({uri:profPic})
        } 
    },[userProfile])

    // useEffect(() => {
    //     navigation.addListener('beforeRemove', (e) => {
    //         e.preventDefault();
    //         console.log('onback');
    //         // Do your stuff here
    //         //setIsModalVisible(true)
    //         navigation.dispatch(e.data.action);
    //     });
    // },[])

    // useEffect(() => { 
    //     navigation.addListener('beforeRemove', (e) => {
    //         e.preventDefault();
    //         console.log('onback');
    //         // Do your stuff here
    //         navigation.dispatch(e.data.action);
    //     });
    // }, []);

    const handleChange = (field, value) => {
        const newFields = {
            ...fields,
            [field]: value
        }
        setFields(newFields);
        if (field === "contrasenaOG") {
            setValidFields({
                ...validFields,
                contrasenaOG:true
            })
        }
        if (newFields.contrasenaNew1 === newFields.contrasenaNew2 && (field === "contrasenaNew1" || field === "contrasenaNew2")) {
            setValidFields({
                ...validFields,
                contrasenaNew1:true,
                contrasenaNew2:true
            })
        }
      };

      useEffect(() => {
        console.log(fields)
      },[fields])

      useEffect(() => {
        console.log(validFields)
      },[validFields])

      const handleSubmit = async () => {
        const newValidFields = { ...validFields };
        for (let field in fields) {
          newValidFields[field] = Boolean(fields[field]);
        }
        setValidFields(newValidFields);

        if (fields.contrasenaNew1 === fields.contrasenaNew2 && fields.contrasenaNew1!="") {
            if (!passwordRegex.test(fields.contrasenaNew1)) {
                setValidFields(
                    {...newValidFields,
                    contrasenaNew1:false,
                    contrasenaNew2:false}
                )
                setErrorMessage(
                  "La contraseña debe tener entre 8 y 15 caracteres, una letra mayúscula, un número y ningún espacio."
                );
              }
        }
        else {
            setValidFields(
                {...newValidFields,
                contrasenaNew1:false,
                contrasenaNew2:false}
            )
            setErrorMessage("Las contraseñas no coinciden")  
        }
    
        const allFieldsAreValid = Object.values(newValidFields).every(
          (value) => value === true
        );
        const allFieldsHaveInput = Object.values(fields).every(
          (value) => value != ""
        );
    
        console.log(fields);
    
        if (allFieldsAreValid && allFieldsHaveInput) {
           setIsLoading(true)
           console.log("todo bien pa cambiele")
           const {data,error} = await supabase.rpc('actualizar_contrasena',{iduser: session.user.id, current_pass:fields.contrasenaOG, new_pass:fields.contrasenaNew1});
           if (error) {
            setValidFields({
                ...validFields,
                contrasenaOG:false
            })
           } else {
             setIsModalVisible(true)
           }
           setIsLoading(false);
        };
    }

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
                    headerTitle: "Editar Contraseña",
                    headerTitleStyle: {fontFamily:FONTS.RubikMedium, fontSize:24}
                }}/>
        <ScrollView>
        <View style={styles.profileInfo}>
          <LinearGradient
              colors={['#FF7208', '#222419']} // Gradient colors
              start={[0, 0]} // Gradient start position
              end={[1, 1]} // Gradient end position
              style={styles.gradientContainer}
              >
              {image.uri ?  (
                <Image
                  source={{ uri: image.uri }}
                  style={styles.profilePicture}
                  resizeMode="cover"
                  
                />
              ) : (
                <View style={styles.noProfilePicture}>
                  <NoAvatarIcon width={"100%"} height={"100%"}/>
                </View>
                
              )}
              </LinearGradient>  
          </View>
          <View style={styles.userInfoContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Contraseña actual
                </Text>
                <PasswordInput
                    placeholder=""
                    style={validFields.contrasenaOG ? styles.input : styles.badInput}
                    handleTextChange={(value) => handleChange("contrasenaOG", value)}
                />
                {!validFields.contrasenaOG && fields.contrasenaOG!="" &&
                    <Text style={styles.badText}>
                        La contraseña ingresada no coincide con la contraseña actual
                    </Text>
                }

                {!validFields.contrasenaOG && fields.contrasenaOG==="" &&
                    <Text style={styles.badText}>
                        Por favor, llena este campo
                    </Text>
                }
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Contraseña Nueva
                </Text>
                <PasswordInput
                    placeholder=""
                    style={validFields.contrasenaNew1 ? styles.input : styles.badInput}
                    handleTextChange={(value) => handleChange("contrasenaNew1", value)}
                />
                {!validFields.contrasenaNew1 && fields.contrasenaNew1 != "" &&
                    <Text style={styles.badText}>
                        {errorMessage}
                    </Text>
                }

                {!validFields.contrasenaNew1 && fields.contrasenaNew1 === "" &&
                    <Text style={styles.badText}>
                        Por favor, llena este campo
                    </Text>
                }
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Confirmar Contraseña
                </Text>
                <PasswordInput
                    placeholder=""
                    style={validFields.contrasenaNew2 ? styles.input : styles.badInput}
                    handleTextChange={(value) => handleChange("contrasenaNew2", value)}
                />
                {!validFields.contrasenaNew2 && fields.contrasenaNew2 != "" &&
                    <Text style={styles.badText}>
                        {errorMessage}
                    </Text>
                }

                {!validFields.contrasenaNew2 && fields.contrasenaNew2 === "" &&
                    <Text style={styles.badText}>
                        Por favor, llena este campo
                    </Text>
                }
            </View>
        </View>
        <View>
            <TouchableOpacity
                style={[styles.btn, styles.shadow]}
                onPress={() => {handleSubmit()}}
                >
                    <Text style={styles.btnText}>Cambiar Contraseña</Text>
            </TouchableOpacity>
            </View>  
        </ScrollView>

        {isLoading && <LoadingScreen/>}

        <ModalOneButton
        isVisible={isModalVisible}
        title="ola"
        message="Contraseña cambiada exitosamente"
        buttonText="Cerrar"
        onPress={() => {
          setIsModalVisible(false);
        }}
        buttonColor={COLORS.lightOrange}
        textColor={COLORS.white}
        exitButtonPress={() => {
          setIsModalVisible(false);
        }}
      />

        </SafeAreaView>      
    )
}

export default EditPasswordForm;