import { View,Text,SafeAreaView,Image, TouchableOpacity, ScrollView } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import styles from './EditProfileForm.style';
import {useRouter,Stack, useNavigation} from 'expo-router';
import {COLORS,FONTS,SIZES} from '../../../constants/theme';
import ReturnButton from '../../common/ReturnButton/ReturnButton';
import {supabase} from '../../../src/supabase';
import { UserProfileContext } from '../../../src/providers/UserProfileProvider';
import { AuthContext } from '../../../src/providers/AuthProvider';
import ProfileImageSelector from '../../common/ProfileImageSelector/ProfileImageSelector';
import ModalTwoButtonTwoText from '../../common/Modal2Button2Text/Modal_2Button2Text';
import ModalOneButton from '../../common/Modal_1Button/Modal_1Button';
import { decode } from 'base64-arraybuffer';
import LoadingScreen from '../../common/LoadingScreen/LoadingScreen';


const EditProfileForm = () => {
    const router = useRouter();
    const navigation =  useNavigation();
    const { userProfile, error } = useContext(UserProfileContext);
    const { session } = useContext(AuthContext);
    const [image, setImage] = useState<{ uri: string; base64?: string; width: number; height: number; }>({ uri: '', base64: '', width: 0, height: 0 });
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isModalTwoVisible, setIsModalTwoVisible] = useState(false);
    const isNavigationAllowed = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const modalMessage = useRef("")
    const { updateUserProfile } = useContext(UserProfileContext)
    const [originalData, setOriginalData] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        celular: "",
        image: {uri:null, base64:null, width:0, height:0}
        
    })
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
            profPic = userProfile.foto;
            console.log(profPic)
            setImage({uri:profPic, base64:null, width:0, height:0})
            setFields({nombres:userProfile.nombres, apellidos:userProfile.apellidos, email:userProfile.email, celular:userProfile.celular})
            setOriginalData({nombres:userProfile.nombres, apellidos:userProfile.apellidos, email:userProfile.email, celular:userProfile.celular, image:{uri:profPic, base64:null, width:0, height:0}})
        }
    },[userProfile])

    useEffect(() => {
        if (image.uri != originalData.image.uri) {
            isNavigationAllowed.current = false;
        }

        if (Object.entries(fields).some(([key,value]) => originalData[key] != value)) {
            isNavigationAllowed.current = false;
        }

        if (Object.entries(fields).every(([key,value]) => originalData[key] === value) && (image.uri === originalData.image.uri)) {
            isNavigationAllowed.current = true;
        }

    },[fields, image])

    useEffect(() => { 
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            if (isNavigationAllowed.current === true) {
                navigation.dispatch(e.data.action);
            } else {
                setIsModalTwoVisible(true)
            }
            
        });

        return unsubscribe;
    }, [isNavigationAllowed]);

    const handleChange = (field, value) => {
        setFields({
          ...fields,
          [field]: value,
        });

        if (value === "") {
            setValidFields({
                ...validFields,
                [field]: false
            })
        } else {
            setValidFields({
                ...validFields,
                [field]: true
            })
        }
      };

    const uploadImage = async() => {
        if (image.uri != null && image.uri != originalData.image.uri) {
            //hay un comportamiento extraño con las fotos y se deben de usar archivos con nombres diferentes para que se vean los cambios
            //se le asigna un numero aleatorio para generar nombres unicos
            let new_number = 0;
            //si el usuario ya tiene foto se debe borrar antes de subir una nueva
            if (originalData.image.uri != null) {
                //conseguir nombre y ruta existente
                const originalFileName = originalData.image.uri.split("/").pop();
                const originalRoute = `${session.user.id}/${originalFileName}`;
                //extraer numero de foto
                const match = originalRoute.match(/profile(\d+)/);
                const numbers = match ? match[1] : null;
                //asignar numero nuevo que no sea igual
                do {
                    new_number = Math.floor(Math.random() * (999999999) + 1);
                } while (new_number === Number(numbers));
                //borrar imagen previa
                await supabase.storage.from("imagenes_perfil_usuarios").remove([originalRoute]);
            }
            else {
                new_number = Math.floor(Math.random() * (999999999) + 1);
            }
            //subir nueva imagen
            const extension = image.uri.split(".").pop().toLowerCase();
            const rutaImage = `${session.user.id}/profile${String(new_number)}.${extension}`
            const {data, error} = await supabase.storage
            .from("imagenes_perfil_usuarios")
            .upload(rutaImage, decode(image.base64), {
                contentType: `image/${extension}`,
            })
            if (data) {
                const ruta = await supabase.storage.from("imagenes_perfil_usuarios").getPublicUrl(rutaImage).data.publicUrl;
                const {error} = await supabase.from("usuarios").update({url_imagen_perfil:ruta}).eq('id',session.user.id);
                if (!error) {
                    modalMessage.current = "Perfil actualizado exitosamente"
                } else {
                    modalMessage.current = "Error al actualizar perfil"
                }
            }
            

        }
    }

    const validatePhone = async() => {
        const {data, error} = await supabase.from("usuarios").select('id').eq("celular",fields.celular);
        const updatedValidFields = {...validFields}
        if (data.length > 0 && data[0].id != session.user.id) {
            updatedValidFields.celular = false;
            setValidFields(updatedValidFields)
        }
        return updatedValidFields
    }

    const validateChanges = async() => {
        if (Object.entries(fields).some(([key,value]) => originalData[key] != value)) {
            const {error} = await supabase.from("usuarios").update({nombres:fields.nombres, apellidos:fields.apellidos, celular:fields.celular}).eq('id', session.user.id)
            if (error) {
                console.log(error)
                modalMessage.current = "Error al actualizar perfil"
                return false
            } else {
                modalMessage.current = "Perfil actualizado exitosamente"
                const newProfile = {
                    ...userProfile,
                    nombres: fields.nombres,
                    apellidos: fields.apellidos,
                    celular: fields.celular,
                    foto: image.uri 
                };
                updateUserProfile(newProfile);
                return true
            }
        } else {
            if (modalMessage.current === "") {
                modalMessage.current = "Por favor modifique los campos que desee cambiar";
            } else{ 
                const newProfile = {
                    ...userProfile,
                    foto: image.uri 
                };
                updateUserProfile(newProfile);
            }
            return false;
        }
    }


    const updateProfile = async() => {
        //poner a cargar la pantalla
        setIsLoading(true);
        //subir imagen si hay
        await uploadImage();
        //verificar que el celular ingresado no este en uso
        const updatedValidFields = await validatePhone();
        //verificar que no hayan campos vacios
        const allFieldsHaveInput = Object.values(fields).every(
            (value) => value != ""
          );
        //verificar que todos los campos sean validos
        const allFieldsAreValid = Object.values(updatedValidFields).every(
            (value) => value === true
          );
        //si todos los campos estan llenos y son validos: verificar que se hayan cambiado los campos y actualizar
        if (allFieldsHaveInput && allFieldsAreValid) {
            await validateChanges();
            setValidFields({
                nombres: true,
                apellidos: true,
                email: true,
                celular: true,
            })
            setIsModalVisible(true)

        }
        //dejar de cargar
        setIsLoading(false)
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
                {!validFields.celular && fields.celular === "" &&
                    <Text style={styles.badText}>
                        Ingresa un número de celular
                    </Text>
                }

                {!validFields.celular && fields.celular != "" &&
                    <Text style={styles.badText}>
                        El número de celular ingresado ya está en uso
                    </Text>
                }
            </View>
          <TouchableOpacity
                style={[styles.btn, styles.shadow, {minWidth:300,maxWidth:400}]}
                onPress={() => {router.navigate("users/EditPassword")}}
                >
                    <Text style={styles.btnText}>Cambiar Contraseña</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity
                style={[styles.btn, styles.shadow]}
                onPress={() => {updateProfile()}}
                >
                    <Text style={styles.btnText}>Guardar Cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.cancelText}> Cancelar </Text>
            </TouchableOpacity>
            </View>  
        </ScrollView>

        {isLoading && 
            <LoadingScreen/>
        }

        <ModalOneButton
        isVisible={isModalVisible}
        title="ola"
        message={modalMessage.current}
        buttonText="Cerrar"
        onPress={() => {
          isNavigationAllowed.current = true
          setIsModalVisible(false);
          if (modalMessage.current != "Por favor modifique los campos que desee cambiar") {
            router.navigate("/events")
          }
          
        }}
        buttonColor="#FF7208"
        textColor={COLORS.white}
        exitButtonPress={() => {
          isNavigationAllowed.current = true
          setIsModalVisible(false);
          if (modalMessage.current != "Por favor modifique los campos que desee cambiar") {
            router.navigate("/events")
          }
        }}
        />

        <ModalTwoButtonTwoText
        isVisible={isModalTwoVisible}
        title="ola"
        message1="Tienes cambios sin guardar. Si sales ahora, se perderán."
        message2="¿Quieres descartar los cambios o continuar editando?"
        buttonText1="Descartar cambios"
        buttonText2="Continuar editando"
        onPress1={() => {
          setIsModalTwoVisible(false);
          isNavigationAllowed.current = true;
          router.back();
        }}
        onPress2={() => {
            setIsModalTwoVisible(false);
        }}
        buttonColor="#FF7208"
        textColor={COLORS.white}
        exitButtonPress={() => {
          setIsModalTwoVisible(false);
        }}
        />       
        </SafeAreaView>      
    )
}

export default EditProfileForm;